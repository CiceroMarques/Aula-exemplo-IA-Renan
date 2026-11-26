import assert from "node:assert/strict";
import { once } from "node:events";
import { after, before, describe, it } from "node:test";
import app from "../app.js";

let server;
let apiUrl;

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await once(server, "listening");

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Não foi possível obter a porta do servidor de testes.");
  }
  apiUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (server)
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
});

describe("API de tarefas", () => {
  it("executa o CRUD e valida os dados enviados", async () => {
    const listResponse = await fetch(`${apiUrl}/api/tarefas`);
    assert.equal(listResponse.status, 200);
    const initialTasks = await listResponse.json();
    assert.equal(initialTasks.length, 4);
    assert.ok(initialTasks.some((task) => task.status === "in-progress"));
    assert.equal(
      initialTasks.find((task) => task.status === "completed")?.completed,
      true,
    );

    const invalidResponse = await fetch(`${apiUrl}/api/tarefas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "   " }),
    });
    assert.equal(invalidResponse.status, 400);

    const invalidStatusResponse = await fetch(`${apiUrl}/api/tarefas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Teste",
        description: "Descrição válida",
        status: "started",
      }),
    });
    assert.equal(invalidStatusResponse.status, 400);

    const createResponse = await fetch(`${apiUrl}/api/tarefas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "  Criar API  ",
        description: "  Revisar endpoints REST  ",
        status: "in-progress",
      }),
    });
    assert.equal(createResponse.status, 201);
    const createdTask = await createResponse.json();
    assert.equal(createdTask.title, "Criar API");
    assert.equal(createdTask.description, "Revisar endpoints REST");
    assert.equal(createdTask.status, "in-progress");
    assert.equal(createdTask.completed, false);

    const updateResponse = await fetch(
      `${apiUrl}/api/tarefas/${createdTask.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Finalizar API",
          description: "Revisar e validar endpoints REST",
          status: "completed",
        }),
      },
    );
    assert.equal(updateResponse.status, 200);
    assert.deepEqual(await updateResponse.json(), {
      ...createdTask,
      title: "Finalizar API",
      description: "Revisar e validar endpoints REST",
      status: "completed",
      completed: true,
    });

    const resetStatusResponse = await fetch(
      `${apiUrl}/api/tarefas/${createdTask.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "in-progress" }),
      },
    );
    assert.equal(resetStatusResponse.status, 200);
    const resetTask = await resetStatusResponse.json();
    assert.equal(resetTask.status, "in-progress");
    assert.equal(resetTask.completed, false);

    const legacyCompletionResponse = await fetch(`${apiUrl}/api/tarefas/${createdTask.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    assert.equal(legacyCompletionResponse.status, 200);
    const legacyCompletedTask = await legacyCompletionResponse.json();
    assert.equal(legacyCompletedTask.status, "completed");
    assert.equal(legacyCompletedTask.completed, true);

    const legacyCreateResponse = await fetch(`${apiUrl}/api/tarefas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "Tarefa de cliente legado" }),
    });
    assert.equal(legacyCreateResponse.status, 201);
    const legacyTask = await legacyCreateResponse.json();
    assert.equal(legacyTask.title, "Tarefa de cliente legado");
    assert.equal(legacyTask.status, "pending");

    const deleteResponse = await fetch(
      `${apiUrl}/api/tarefas/${createdTask.id}`,
      {
        method: "DELETE",
      },
    );
    assert.equal(deleteResponse.status, 204);

    const legacyDeleteResponse = await fetch(
      `${apiUrl}/api/tarefas/${legacyTask.id}`,
      {
        method: "DELETE",
      },
    );
    assert.equal(legacyDeleteResponse.status, 204);

    const missingResponse = await fetch(
      `${apiUrl}/api/tarefas/${createdTask.id}`,
    );
    assert.equal(missingResponse.status, 404);
  });
});

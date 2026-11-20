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
    assert.equal((await listResponse.json()).length, 4);

    const invalidResponse = await fetch(`${apiUrl}/api/tarefas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "   " }),
    });
    assert.equal(invalidResponse.status, 400);

    const createResponse = await fetch(`${apiUrl}/api/tarefas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "  Revisar APIs  " }),
    });
    assert.equal(createResponse.status, 201);
    const createdTask = await createResponse.json();
    assert.equal(createdTask.description, "Revisar APIs");
    assert.equal(createdTask.completed, false);

    const updateResponse = await fetch(`${apiUrl}/api/tarefas/${createdTask.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "Revisar APIs REST", completed: true }),
    });
    assert.equal(updateResponse.status, 200);
    assert.deepEqual(await updateResponse.json(), {
      ...createdTask,
      description: "Revisar APIs REST",
      completed: true,
    });

    const resetStatusResponse = await fetch(`${apiUrl}/api/tarefas/${createdTask.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: false }),
    });
    assert.equal(resetStatusResponse.status, 200);
    assert.equal((await resetStatusResponse.json()).completed, false);

    const deleteResponse = await fetch(`${apiUrl}/api/tarefas/${createdTask.id}`, {
      method: "DELETE",
    });
    assert.equal(deleteResponse.status, 204);

    const missingResponse = await fetch(`${apiUrl}/api/tarefas/${createdTask.id}`);
    assert.equal(missingResponse.status, 404);
  });
});

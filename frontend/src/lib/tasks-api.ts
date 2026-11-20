import type { Task } from "./tasks";

function isTask(value: unknown): value is Task {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "description" in value &&
    typeof value.description === "string" &&
    "completed" in value &&
    typeof value.completed === "boolean"
  );
}

async function request(path: string, options?: RequestInit): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(path, options);
  } catch {
    throw new Error("Não foi possível conectar à API. Verifique se o backend está em execução.");
  }

  if (response.status === 204) return undefined;

  const payload: unknown = await response.json();
  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof payload.error === "string"
        ? payload.error
        : `A API respondeu com o status ${response.status}.`;
    throw new Error(message);
  }

  return payload;
}

export async function fetchTasks(): Promise<Task[]> {
  const payload = await request("/api/tarefas");
  if (!Array.isArray(payload) || !payload.every(isTask)) {
    throw new Error("A API retornou uma lista de tarefas inválida.");
  }
  return payload;
}

export async function createTask(description: string): Promise<Task> {
  const payload = await request("/api/tarefas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  if (!isTask(payload)) throw new Error("A API retornou uma tarefa inválida.");
  return payload;
}

export async function updateTask(
  id: string,
  changes: Partial<Pick<Task, "description" | "completed">>,
): Promise<Task> {
  const payload = await request(`/api/tarefas/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
  if (!isTask(payload)) throw new Error("A API retornou uma tarefa inválida.");
  return payload;
}

export async function deleteTask(id: string): Promise<void> {
  await request(`/api/tarefas/${encodeURIComponent(id)}`, { method: "DELETE" });
}

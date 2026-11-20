export type Task = { id: string; description: string; completed: boolean };
export type TaskFilter = "all" | "pending" | "completed";

export const initialTasks: Task[] = [
  { id: "1", description: "Estudar JavaScript", completed: false },
  { id: "2", description: "Revisar conceitos de React", completed: false },
  { id: "3", description: "Fazer exercícios de lógica de programação", completed: false },
  { id: "4", description: "Estudar HTML e CSS", completed: true },
];

export function validateDescription(description: string) {
  const value = description.trim();
  if (!value) throw new Error("Informe uma descrição para a tarefa.");
  return value;
}

export function filterTasks(tasks: Task[], filter: TaskFilter) {
  return tasks.filter((task) => filter === "all" || (filter === "completed" ? task.completed : !task.completed));
}

export function updateTask(tasks: Task[], id: string, changes: Partial<Pick<Task, "description" | "completed">>) {
  return tasks.map((task) => task.id === id ? { ...task, ...changes } : task);
}
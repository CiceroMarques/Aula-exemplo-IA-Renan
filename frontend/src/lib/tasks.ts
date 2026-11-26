export type TaskStatus = "pending" | "in-progress" | "completed";
export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  completed: boolean;
};
export type TaskFilter = "all" | TaskStatus;

export const taskStatuses: { value: TaskStatus; label: string }[] = [
  { value: "pending", label: "Pendente" },
  { value: "in-progress", label: "Em andamento" },
  { value: "completed", label: "Concluída" },
];

export function isTaskStatus(value: string): value is TaskStatus {
  return taskStatuses.some((status) => status.value === value);
}

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Estudar JavaScript",
    description: "Revisar os conceitos fundamentais de JavaScript.",
    status: "in-progress",
    completed: false,
  },
  {
    id: "2",
    title: "Revisar conceitos de React",
    description: "Revisar componentes e conceitos principais de React.",
    status: "pending",
    completed: false,
  },
  {
    id: "3",
    title: "Estudar HTML e CSS",
    description: "Revisar estrutura HTML e estilos CSS.",
    status: "completed",
    completed: true,
  },
];

export function validateTitle(title: string) {
  const value = title.trim();
  if (!value) throw new Error("Informe um título para a tarefa.");
  return value;
}

export function validateDescription(description: string) {
  const value = description.trim();
  if (!value) throw new Error("Informe uma descrição para a tarefa.");
  return value;
}

export function filterTasks(tasks: Task[], filter: TaskFilter) {
  return tasks.filter((task) => filter === "all" || task.status === filter);
}

export function updateTask(tasks: Task[], id: string, changes: Partial<Omit<Task, "id">>) {
  return tasks.map((task) => {
    if (task.id !== id) return task;

    const updated = { ...task, ...changes };
    if (changes.status !== undefined) updated.completed = changes.status === "completed";
    if (changes.completed !== undefined && changes.status === undefined) {
      updated.status = changes.completed ? "completed" : "pending";
    }
    return updated;
  });
}

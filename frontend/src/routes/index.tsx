import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  CircleAlert,
  ClipboardList,
  LoaderCircle,
  Plus,
  Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TaskRow } from "@/components/task-row";
import {
  createTask as createTaskApi,
  deleteTask as deleteTaskApi,
  fetchTasks,
  updateTask as updateTaskApi,
} from "@/lib/tasks-api";
import {
  filterTasks,
  isTaskStatus,
  taskStatuses,
  updateTask,
  validateDescription,
  validateTitle,
  type Task,
  type TaskFilter,
  type TaskStatus,
} from "@/lib/tasks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Minhas tarefas | Lista de Atividades Estudos" },
      {
        name: "description",
        content: "Organize seus estudos e acompanhe seu progresso com uma lista de tarefas.",
      },
      { property: "og:title", content: "Minhas tarefas | Lista de Atividades Estudos" },
      {
        property: "og:description",
        content: "Organize seus estudos e acompanhe seu progresso com uma lista de tarefas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type UndoChange = { taskId: string; title: string; previousStatus: TaskStatus };
type Notification = { kind: "success" | "error"; text: string };

function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>("pending");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [busy, setBusy] = useState(true);
  const [deleting, setDeleting] = useState<Task | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [undoChange, setUndoChange] = useState<UndoChange | null>(null);
  const lock = useRef(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const loadTasks = useCallback(async () => {
    if (lock.current) return false;
    lock.current = true;
    setBusy(true);
    try {
      setTasks(await fetchTasks());
      setLoadError(null);
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Não foi possível carregar as tarefas.";
      setLoadError(message);
      setNotification({ kind: "error", text: message });
      return false;
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 6000);
    return () => clearTimeout(timer);
  }, [notification]);

  async function process(action: () => Promise<void>, success: string, failure: string) {
    if (lock.current) return false;
    lock.current = true;
    setBusy(true);
    try {
      await action();
      setLoadError(null);
      setNotification({ kind: "success", text: success });
      return true;
    } catch (error) {
      setNotification({
        kind: "error",
        text: error instanceof Error ? error.message : failure,
      });
      return false;
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  function getFilterCount(value: TaskFilter) {
    return filterTasks(tasks, value).length;
  }

  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const inProgressCount = tasks.filter((task) => task.status === "in-progress").length;
  const filterOptions: { value: TaskFilter; label: string }[] = [
    { value: "all", label: "Todas" },
    ...taskStatuses,
  ];

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let taskTitle: string;
    let taskDescription: string;
    try {
      taskTitle = validateTitle(title);
      taskDescription = validateDescription(description);
    } catch (error) {
      setNotification({
        kind: "error",
        text: error instanceof Error ? error.message : "Confira os dados da tarefa.",
      });
      return;
    }

    const added = await process(
      async () => {
        const task = await createTaskApi(taskTitle, taskDescription, newTaskStatus);
        setTasks((current) => [...current, task]);
        setUndoChange(null);
        setTitle("");
        setDescription("");
        setNewTaskStatus("pending");
      },
      "Tarefa adicionada com sucesso!",
      "Não foi possível adicionar a tarefa.",
    );
    if (added) titleRef.current?.focus();
  }

  function handleStatusChange(task: Task, status: TaskStatus) {
    if (task.status === status) return;
    const previousStatus = task.status;

    void process(
      async () => {
        const updated = await updateTaskApi(task.id, { status });
        setTasks((current) => updateTask(current, task.id, updated));
        setUndoChange({ taskId: task.id, title: task.title, previousStatus });
      },
      `Status alterado para ${taskStatuses.find((item) => item.value === status)?.label}.`,
      "Não foi possível atualizar o status.",
    );
  }

  function handleUndo() {
    if (!undoChange) return;
    const change = undoChange;

    void process(
      async () => {
        const updated = await updateTaskApi(change.taskId, { status: change.previousStatus });
        setTasks((current) => updateTask(current, change.taskId, updated));
        setUndoChange(null);
      },
      `Status de “${change.title}” restaurado.`,
      "Não foi possível desfazer a alteração.",
    );
  }

  function handleSave(task: Task, nextTitle: string, nextDescription: string) {
    let validTitle: string;
    let validDescription: string;
    try {
      validTitle = validateTitle(nextTitle);
      validDescription = validateDescription(nextDescription);
    } catch (error) {
      setNotification({
        kind: "error",
        text: error instanceof Error ? error.message : "Confira os dados da tarefa.",
      });
      return Promise.resolve(false);
    }

    return process(
      async () => {
        const updated = await updateTaskApi(task.id, {
          title: validTitle,
          description: validDescription,
        });
        setTasks((current) => updateTask(current, task.id, updated));
        setUndoChange(null);
      },
      "Tarefa atualizada com sucesso!",
      "Não foi possível atualizar a tarefa.",
    );
  }

  const columns = [
    { status: "pending" as const, label: "Pendente", className: "pending-column" },
    { status: "in-progress" as const, label: "Em andamento", className: "in-progress-column" },
    { status: "completed" as const, label: "Concluída", className: "completed-column" },
  ];

  return (
    <div className="min-h-screen">
      <div inert={busy} aria-busy={busy}>
        <header className="app-header">
          <div className="app-header-inner">
            <span className="brand-icon">
              <BookOpen size={21} strokeWidth={1.8} />
            </span>
            <span className="text-sm font-bold">
              Lista de Atividades <span className="font-medium text-muted-foreground">Estudos</span>
            </span>
          </div>
        </header>

        <main className="tasks-page">
          <section className="welcome">
            <div>
              <p className="eyebrow">SEU ESPAÇO DE ESTUDOS</p>
              <h1>
                Minhas tarefas<span className="text-primary">.</span>
              </h1>
              <p>Organize seus estudos e acompanhe cada etapa.</p>
            </div>
            <div className="progress-summary" aria-live="polite">
              <strong>{inProgressCount}</strong>
              <span>em andamento</span>
            </div>
          </section>

          <section className="create-box" aria-labelledby="create-heading">
            <div className="create-heading">
              <span className="plus-mark" aria-hidden="true">
                <Plus size={19} />
              </span>
              <div>
                <h2 id="create-heading">Nova tarefa</h2>
                <p>Preencha os campos para organizar seu próximo estudo.</p>
              </div>
            </div>
            <form className="create-form" onSubmit={handleCreate}>
              <div className="create-title-status">
                <div className="field">
                  <label htmlFor="new-task-title">Título da tarefa</label>
                  <Input
                    ref={titleRef}
                    id="new-task-title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Ex.: Praticar equações"
                    disabled={busy}
                    maxLength={120}
                  />
                </div>
                <div className="field">
                  <label htmlFor="new-task-status">Status inicial</label>
                  <select
                    id="new-task-status"
                    value={newTaskStatus}
                    disabled={busy}
                    onChange={(event) => {
                      if (isTaskStatus(event.target.value)) setNewTaskStatus(event.target.value);
                    }}
                  >
                    {taskStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="new-task-description">Descrição</label>
                <Textarea
                  id="new-task-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Inclua um detalhe para lembrar por onde começar."
                  rows={2}
                  disabled={busy}
                  maxLength={1000}
                />
              </div>
              <Button className="create-task-button" type="submit" disabled={busy}>
                <Plus size={17} /> Salvar tarefa
              </Button>
            </form>
          </section>

          <section className="board-section" aria-label="Tarefas organizadas por status">
            <div className="board-toolbar">
              <div className="filter-bar" role="group" aria-label="Filtrar tarefas">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant="ghost"
                    className="filter-button"
                    data-active={filter === option.value}
                    aria-pressed={filter === option.value}
                    onClick={() => setFilter(option.value)}
                  >
                    {option.label}
                    <span className="filter-count">{getFilterCount(option.value)}</span>
                  </Button>
                ))}
              </div>
              <span className="completed-summary">
                <Check size={14} /> {completedCount} de {tasks.length} concluídas
              </span>
            </div>

            {loadError ? (
              <div className="board-error" role="alert">
                <CircleAlert size={20} />
                <p>{loadError}</p>
                <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={() => void loadTasks()}
                >
                  Tentar novamente
                </Button>
              </div>
            ) : (
              <div className={`task-board${filter === "all" ? "" : " board-filtered"}`}>
                {columns.map((column) => {
                  if (filter !== "all" && filter !== column.status) return null;
                  const columnTasks = filterTasks(tasks, column.status);

                  return (
                    <section
                      className={`task-column ${column.className}`}
                      key={column.status}
                      aria-labelledby={`column-${column.status}`}
                    >
                      <div className="column-heading">
                        <span className="column-indicator" aria-hidden="true" />
                        <h2 id={`column-${column.status}`}>{column.label}</h2>
                        <span className="column-count">{columnTasks.length}</span>
                      </div>
                      {columnTasks.length > 0 ? (
                        <ul className="column-task-list">
                          {columnTasks.map((task) => (
                            <TaskRow
                              key={task.id}
                              task={task}
                              busy={busy}
                              onStatusChange={(status) => handleStatusChange(task, status)}
                              onDelete={() => setDeleting(task)}
                              onSave={(nextTitle, nextDescription) =>
                                handleSave(task, nextTitle, nextDescription)
                              }
                            />
                          ))}
                        </ul>
                      ) : (
                        <div className="column-empty">
                          <ClipboardList size={20} />
                          <p>
                            {tasks.length === 0
                              ? "Nenhuma tarefa cadastrada."
                              : `Nenhuma tarefa ${column.label.toLowerCase()}.`}
                          </p>
                        </div>
                      )}
                      <p className="column-help">
                        {column.status === "pending"
                          ? "Tarefas que você ainda vai começar."
                          : column.status === "in-progress"
                            ? "Tarefas iniciadas, mas ainda não finalizadas."
                            : "Suas tarefas já finalizadas."}
                      </p>
                    </section>
                  );
                })}
              </div>
            )}
          </section>

          <p className="prototype-note">
            <CircleAlert size={13} />
            Dados de demonstração em memória · As tarefas reiniciam quando o backend é reiniciado.
          </p>
        </main>

        <AlertDialog
          open={deleting !== null}
          onOpenChange={(open) => {
            if (!open) setDeleting(null);
          }}
        >
          <AlertDialogContent className="w-[calc(100%-32px)] max-w-md rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja realmente excluir esta tarefa?</AlertDialogTitle>
              <AlertDialogDescription className="break-words">
                {deleting && (
                  <>
                    <strong>{deleting.title}</strong>
                    <br />
                    {deleting.description}
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Button
                type="button"
                variant="destructive"
                disabled={busy}
                onClick={() => {
                  if (!deleting) return;
                  const task = deleting;
                  setDeleting(null);
                  void process(
                    async () => {
                      await deleteTaskApi(task.id);
                      setTasks((current) => current.filter((item) => item.id !== task.id));
                      setUndoChange(null);
                    },
                    "Tarefa excluída com sucesso!",
                    "Não foi possível excluir a tarefa.",
                  );
                }}
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {busy && (
        <div className="loading-overlay" role="status" aria-live="polite">
          <div className="loading-message">
            <LoaderCircle className="animate-spin text-primary" size={22} />
            Processando...
          </div>
        </div>
      )}
      {notification && (
        <div
          className="notification"
          data-kind={notification.kind}
          role={notification.kind === "error" ? "alert" : "status"}
        >
          {notification.kind === "error" ? <CircleAlert size={19} /> : <Check size={19} />}
          <span>{notification.text}</span>
          {notification.kind === "success" && undoChange && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="undo-button"
              disabled={busy}
              onClick={handleUndo}
            >
              <Undo2 size={16} /> Desfazer
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

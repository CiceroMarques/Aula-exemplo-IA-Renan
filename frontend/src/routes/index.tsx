import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpen, Check, CheckCircle2, CircleAlert, ClipboardList, LoaderCircle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { TaskRow } from "@/components/task-row";
import { createTask as createTaskApi, deleteTask as deleteTaskApi, fetchTasks, updateTask as updateTaskApi } from "@/lib/tasks-api";
import { filterTasks, updateTask, validateDescription, type Task, type TaskFilter } from "@/lib/tasks";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Minhas tarefas | Lista de Atividades Estudos" },
    { name: "description", content: "Organize seus estudos e acompanhe seu progresso com uma lista simples de tarefas de estudo." },
    { property: "og:title", content: "Minhas tarefas | Lista de Atividades Estudos" },
    { property: "og:description", content: "Organize seus estudos e acompanhe seu progresso com uma lista simples de tarefas de estudo." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [busy, setBusy] = useState(true);
  const lock = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [deleting, setDeleting] = useState<Task | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const loadTasks = useCallback(async () => {
    if (lock.current) return false;
    lock.current = true;
    setBusy(true);
    try {
      setTasks(await fetchTasks());
      setLoadError(null);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível carregar as tarefas.";
      setLoadError(message);
      setNotification({ kind: "error", text: message });
      return false;
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }, []);

  useEffect(() => { void loadTasks(); }, [loadTasks]);
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 4000);
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
      setNotification({ kind: "error", text: error instanceof Error ? error.message : failure });
      return false;
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  function validate(value: string) {
    try { return validateDescription(value); }
    catch { setNotification({ kind: "error", text: "Informe uma descrição para a tarefa." }); return null; }
  }

  const completed = tasks.filter((task) => task.completed).length;
  const visibleTasks = filterTasks(tasks, filter);
  const filters: { value: TaskFilter; label: string; count: number }[] = [
    { value: "all", label: "Todas", count: tasks.length },
    { value: "pending", label: "Pendentes", count: tasks.length - completed },
    { value: "completed", label: "Concluídas", count: completed },
  ];

  return (
    <div className="min-h-screen">
      <div inert={busy} aria-busy={busy}>
        <header className="app-header">
          <div className="mx-auto flex h-20 max-w-[1040px] items-center gap-3 px-6">
            <span className="brand-icon"><BookOpen size={21} strokeWidth={1.8} /></span>
            <span className="text-sm font-bold">Lista de Atividades <span className="font-medium text-muted-foreground">Estudos</span></span>
          </div>
        </header>
        <main className="mx-auto max-w-[880px] px-5 pb-16 pt-12 sm:px-6 sm:pt-16">
          <div className="mb-9">
            <div className="mb-4 flex items-center gap-2 text-xs font-medium text-primary"><span className="h-1 w-5 rounded-full bg-primary" />SEU ESPAÇO DE ESTUDOS</div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">Minhas tarefas<span className="text-primary">.</span></h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Organize seus estudos e acompanhe seu progresso.</p>
          </div>
          <form className="task-entry" onSubmit={async (event) => {
            event.preventDefault();
            const value = validate(description);
            if (value === null) return;
            const added = await process(async () => {
              const task = await createTaskApi(value);
              setTasks((current) => [...current, task]);
              setDescription("");
            }, "Tarefa adicionada com sucesso!", "Não foi possível adicionar a tarefa.");
            if (added) inputRef.current?.focus();
          }}>
            <label htmlFor="new-task" className="mb-3 block text-sm font-semibold">O que vamos estudar?</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input ref={inputRef} id="new-task" className="entry-input" placeholder="Digite uma nova tarefa..." value={description} onChange={(event) => setDescription(event.target.value)} disabled={busy} />
              <Button className="add-button" type="submit" disabled={busy}><Plus size={18} />Adicionar</Button>
            </div>
          </form>
          <section className="mt-8" aria-label="Lista de tarefas">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div className="filter-bar" role="group" aria-label="Filtrar tarefas">
                {filters.map((item) => <Button key={item.value} variant="ghost" className="filter-button" data-active={filter === item.value} aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}<span className="filter-count">{item.count}</span></Button>)}
              </div>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle2 size={14} />{completed} de {tasks.length} concluídas</span>
            </div>
            <ul className="task-list">
              {visibleTasks.map((task) => <TaskRow key={task.id} task={task} busy={busy} onToggle={() => { void process(async () => {
                const updated = await updateTaskApi(task.id, { completed: !task.completed });
                setTasks((current) => updateTask(current, task.id, { completed: updated.completed }));
              }, "Status atualizado com sucesso!", "Não foi possível atualizar a tarefa."); }} onDelete={() => setDeleting(task)} onSave={async (draft) => {
                const value = validate(draft);
                if (value === null) return false;
                return process(async () => {
                  const updated = await updateTaskApi(task.id, { description: value });
                  setTasks((current) => updateTask(current, task.id, { description: updated.description }));
                }, "Tarefa atualizada com sucesso!", "Não foi possível atualizar a tarefa.");
              }} />)}
              {visibleTasks.length === 0 && <li className="empty-state"><span className="empty-icon"><ClipboardList size={25} /></span><h2 className="text-base font-semibold">{loadError ? "Não foi possível carregar as tarefas." : tasks.length === 0 ? "Nenhuma tarefa cadastrada." : filter === "pending" ? "Nenhuma tarefa pendente." : "Nenhuma tarefa concluída."}</h2>{loadError ? <><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{loadError}</p><Button className="mt-4" variant="outline" disabled={busy} onClick={() => { void loadTasks(); }}>Tentar novamente</Button></> : tasks.length === 0 && <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Você ainda não possui tarefas cadastradas para hoje. Adicione sua primeira tarefa e comece a organizar seus estudos!</p>}</li>}
            </ul>
          </section>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs leading-5 text-muted-foreground"><CircleAlert size={13} className="shrink-0" />Dados de demonstração em memória · As tarefas são reiniciadas quando o backend é reiniciado.</p>
        </main>
        <AlertDialog open={deleting !== null} onOpenChange={(open) => { if (!open) setDeleting(null); }}>
          <AlertDialogContent className="w-[calc(100%-32px)] max-w-md rounded-lg">
            <AlertDialogHeader><AlertDialogTitle>Deseja realmente excluir esta tarefa?</AlertDialogTitle><AlertDialogDescription className="break-words">{deleting?.description}</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><Button variant="destructive" onClick={() => {
              if (!deleting) return;
              const id = deleting.id;
              setDeleting(null);
              void process(async () => {
                await deleteTaskApi(id);
                setTasks((current) => current.filter((task) => task.id !== id));
              }, "Tarefa excluída com sucesso!", "Não foi possível excluir a tarefa.");
            }}><Trash2 />Excluir</Button></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {busy && <div className="loading-overlay" role="status" aria-live="polite"><div className="loading-message"><LoaderCircle className="animate-spin text-primary" size={22} />Processando...</div></div>}
      {notification && <div className="notification" data-kind={notification.kind} role={notification.kind === "error" ? "alert" : "status"}>{notification.kind === "error" ? <CircleAlert size={19} /> : <Check size={19} />}{notification.text}</div>}
    </div>
  );
}

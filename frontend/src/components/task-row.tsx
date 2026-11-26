import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isTaskStatus, taskStatuses, type Task, type TaskStatus } from "@/lib/tasks";

type Props = {
  task: Task;
  busy: boolean;
  onStatusChange: (status: TaskStatus) => void;
  onDelete: () => void;
  onSave: (title: string, description: string) => Promise<boolean>;
};

const nextStatus: Record<TaskStatus, TaskStatus> = {
  pending: "in-progress",
  "in-progress": "completed",
  completed: "pending",
};

const actionLabel: Record<TaskStatus, string> = {
  pending: "Iniciar tarefa",
  "in-progress": "Marcar como concluída",
  completed: "Reabrir tarefa",
};

export function TaskRow({ task, busy, onStatusChange, onDelete, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftDescription, setDraftDescription] = useState(task.description);
  const statusLabel =
    taskStatuses.find((status) => status.value === task.status)?.label ?? task.status;

  if (editing) {
    return (
      <li className={`board-task state-${task.status}`}>
        <form
          className="task-edit-form"
          onSubmit={async (event) => {
            event.preventDefault();
            if (await onSave(draftTitle, draftDescription)) setEditing(false);
          }}
        >
          <label htmlFor={`title-${task.id}`}>Título</label>
          <Input
            id={`title-${task.id}`}
            autoFocus
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            disabled={busy}
          />
          <label htmlFor={`description-${task.id}`}>Descrição</label>
          <Textarea
            id={`description-${task.id}`}
            value={draftDescription}
            onChange={(event) => setDraftDescription(event.target.value)}
            disabled={busy}
            rows={3}
          />
          <div className="task-edit-actions">
            <Button type="submit" size="sm" disabled={busy}>
              <Check /> Salvar
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={busy}
              onClick={() => setEditing(false)}
            >
              <X /> Cancelar
            </Button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={`board-task state-${task.status}`}>
      <span className={`task-status-chip status-${task.status}`}>{statusLabel}</span>
      <h3 className="board-task-title" data-complete={task.status === "completed"}>
        {task.title}
      </h3>
      <p className="board-task-description">{task.description}</p>
      <label className="task-status-control">
        <span>Alterar status</span>
        <select
          aria-label={`Alterar status de ${task.title}`}
          value={task.status}
          disabled={busy}
          onChange={(event) => {
            if (isTaskStatus(event.target.value)) onStatusChange(event.target.value);
          }}
        >
          {taskStatuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </label>
      <div className="board-task-actions">
        <Button
          type="button"
          className="task-transition-button"
          disabled={busy}
          onClick={() => onStatusChange(nextStatus[task.status])}
        >
          {actionLabel[task.status]}
        </Button>
        <div className="task-secondary-actions">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={busy}
            title="Editar tarefa"
            aria-label={`Editar ${task.title}`}
            onClick={() => {
              setDraftTitle(task.title);
              setDraftDescription(task.description);
              setEditing(true);
            }}
          >
            <Pencil />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="delete-button"
            disabled={busy}
            title="Excluir tarefa"
            aria-label={`Excluir ${task.title}`}
            onClick={onDelete}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </li>
  );
}

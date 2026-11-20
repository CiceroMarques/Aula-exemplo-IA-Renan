import { useState } from "react";
import { Check, Circle, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { Task } from "@/lib/tasks";

type Props = { task: Task; busy: boolean; onToggle: () => void; onDelete: () => void; onSave: (description: string) => Promise<boolean> };

export function TaskRow({ task, busy, onToggle, onDelete, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.description);
  return (
    <li className="task-row">
      <div className="flex size-8 shrink-0 items-center justify-center">
        <Checkbox className="task-checkbox" checked={task.completed} disabled={busy || editing} onCheckedChange={onToggle} aria-label={`Marcar ${task.description} como ${task.completed ? "pendente" : "concluída"}`} />
      </div>
      {editing ? (
        <form className="min-w-0 flex-1" onSubmit={async (event) => { event.preventDefault(); if (await onSave(draft)) setEditing(false); }}>
          <label className="sr-only" htmlFor={`edit-${task.id}`}>Descrição da tarefa</label>
          <Input id={`edit-${task.id}`} autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} disabled={busy} onKeyDown={(event) => { if (event.key === "Escape") setEditing(false); }} />
          <div className="mt-3 flex gap-2">
            <Button type="submit" disabled={busy} size="sm"><Check />Salvar</Button>
            <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => setEditing(false)}><X />Cancelar</Button>
          </div>
        </form>
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <p className="task-description" data-complete={task.completed}>{task.description}</p>
            <span className="task-status" data-complete={task.completed}>{task.completed ? <Check size={12} /> : <Circle size={7} />}{task.completed ? "Concluída" : "Pendente"}</span>
          </div>
          <div className="task-actions">
            <Button variant="ghost" size="icon" disabled={busy} title="Editar tarefa" aria-label={`Editar ${task.description}`} onClick={() => { setDraft(task.description); setEditing(true); }}><Pencil /></Button>
            <Button variant="ghost" size="icon" className="delete-button" disabled={busy} title="Excluir tarefa" aria-label={`Excluir ${task.description}`} onClick={onDelete}><Trash2 /></Button>
          </div>
        </>
      )}
    </li>
  );
}
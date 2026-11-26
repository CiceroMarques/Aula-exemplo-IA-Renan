import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TaskRow } from "@/components/task-row";
import type { Task, TaskStatus } from "@/lib/tasks";

const task: Task = {
  id: "task-1",
  title: "Estudar JavaScript",
  description: "Revisar funções e objetos.",
  status: "pending",
  completed: false,
};

function renderTaskRow(
  overrides?: Partial<{
    onStatusChange: (status: TaskStatus) => void;
    onDelete: () => void;
    onSave: (title: string, description: string) => Promise<boolean>;
  }>,
) {
  const props = {
    task,
    busy: false,
    onStatusChange: vi.fn<(status: TaskStatus) => void>(),
    onDelete: vi.fn<() => void>(),
    onSave: vi
      .fn<(title: string, description: string) => Promise<boolean>>()
      .mockResolvedValue(true),
    ...overrides,
  };

  render(<TaskRow {...props} />);
  return props;
}

describe("interações da tarefa", () => {
  it("solicita a mudança de status ao iniciar uma tarefa", () => {
    const { onStatusChange } = renderTaskRow();

    fireEvent.click(screen.getByRole("button", { name: "Iniciar tarefa" }));

    expect(onStatusChange).toHaveBeenCalledWith("in-progress");
  });

  it("envia título e descrição editados ao salvar", async () => {
    const { onSave } = renderTaskRow();

    fireEvent.click(screen.getByRole("button", { name: "Editar Estudar JavaScript" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Título" }), {
      target: { value: "Praticar TypeScript" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Descrição" }), {
      target: { value: "Revisar tipos e interfaces." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Salvar" }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith("Praticar TypeScript", "Revisar tipos e interfaces.");
      expect(screen.queryByRole("textbox", { name: "Título" })).not.toBeInTheDocument();
    });
  });

  it("mantém o formulário aberto quando o salvamento falha", async () => {
    const onSave = vi
      .fn<(title: string, description: string) => Promise<boolean>>()
      .mockResolvedValue(false);
    renderTaskRow({ onSave });

    fireEvent.click(screen.getByRole("button", { name: "Editar Estudar JavaScript" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar" }));

    expect(await screen.findByRole("textbox", { name: "Título" })).toBeInTheDocument();
  });

  it("notifica quando a pessoa solicita excluir a tarefa", () => {
    const { onDelete } = renderTaskRow();

    fireEvent.click(screen.getByRole("button", { name: "Excluir Estudar JavaScript" }));

    expect(onDelete).toHaveBeenCalledOnce();
  });
});

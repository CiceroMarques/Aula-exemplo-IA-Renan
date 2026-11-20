import { randomUUID } from "node:crypto";

class ModelTarefa {
  #tarefas = [
    { id: "1", description: "Estudar JavaScript", completed: false },
    { id: "2", description: "Revisar conceitos de React", completed: false },
    { id: "3", description: "Fazer exercícios de lógica de programação", completed: false },
    { id: "4", description: "Estudar HTML e CSS", completed: true },
  ];

  ListarTodos() {
    return this.#tarefas.map((tarefa) => ({ ...tarefa }));
  }

  BuscarPorId(id) {
    const tarefa = this.#tarefas.find((item) => item.id === id);
    return tarefa ? { ...tarefa } : null;
  }

  Criar(dados) {
    const tarefa = { id: randomUUID(), ...dados };
    this.#tarefas.push(tarefa);
    return { ...tarefa };
  }

  Atualizar(id, alteracoes) {
    const indice = this.#tarefas.findIndex((tarefa) => tarefa.id === id);
    if (indice === -1) return null;

    this.#tarefas[indice] = { ...this.#tarefas[indice], ...alteracoes };
    return { ...this.#tarefas[indice] };
  }

  Deletar(id) {
    const indice = this.#tarefas.findIndex((tarefa) => tarefa.id === id);
    if (indice === -1) return false;

    this.#tarefas.splice(indice, 1);
    return true;
  }
}

export default new ModelTarefa();

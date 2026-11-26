import { randomUUID } from "node:crypto";

class ModelTarefa {
  #tarefas = [
    {
      id: "1",
      title: "Estudar JavaScript",
      description: "Revisar os conceitos fundamentais de JavaScript.",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Revisar conceitos de React",
      description: "Revisar componentes e conceitos principais de React.",
      status: "pending",
    },
    {
      id: "3",
      title: "Fazer exercícios de lógica",
      description: "Resolver exercícios práticos de lógica de programação.",
      status: "pending",
    },
    {
      id: "4",
      title: "Estudar HTML e CSS",
      description: "Revisar estrutura HTML e estilos CSS.",
      status: "completed",
    },
  ];

  #serializar(tarefa) {
    return { ...tarefa, completed: tarefa.status === "completed" };
  }

  ListarTodos() {
    return this.#tarefas.map((tarefa) => this.#serializar(tarefa));
  }

  BuscarPorId(id) {
    const tarefa = this.#tarefas.find((item) => item.id === id);
    return tarefa ? this.#serializar(tarefa) : null;
  }

  Criar(dados) {
    const tarefa = { id: randomUUID(), ...dados };
    this.#tarefas.push(tarefa);
    return this.#serializar(tarefa);
  }

  Atualizar(id, alteracoes) {
    const indice = this.#tarefas.findIndex((tarefa) => tarefa.id === id);
    if (indice === -1) return null;

    this.#tarefas[indice] = { ...this.#tarefas[indice], ...alteracoes };
    return this.#serializar(this.#tarefas[indice]);
  }

  Deletar(id) {
    const indice = this.#tarefas.findIndex((tarefa) => tarefa.id === id);
    if (indice === -1) return false;

    this.#tarefas.splice(indice, 1);
    return true;
  }
}

export default new ModelTarefa();

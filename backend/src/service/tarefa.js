import ModelTarefa from "../model/tarefa.js";

const camposPermitidos = new Set([
  "title",
  "description",
  "status",
  "completed",
]);
const statusPermitidos = new Set(["pending", "in-progress", "completed"]);

function criarErro(status, mensagem) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

function validarObjeto(dados) {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    throw criarErro(400, "Envie os dados da tarefa em um objeto JSON.");
  }

  const camposInvalidos = Object.keys(dados).filter(
    (campo) => !camposPermitidos.has(campo),
  );
  if (camposInvalidos.length > 0) {
    throw criarErro(
      400,
      `Campo(s) não permitido(s): ${camposInvalidos.join(", ")}.`,
    );
  }
}

function validarDescricao(description) {
  return validarTexto(description, "Informe uma descrição para a tarefa.");
}

function validarTexto(valor, mensagem) {
  if (typeof valor !== "string" || !valor.trim())
    throw criarErro(400, mensagem);
  return valor.trim();
}

function validarStatus(status) {
  if (!statusPermitidos.has(status)) {
    throw criarErro(
      400,
      "O status deve ser pending, in-progress ou completed.",
    );
  }
  return status;
}

function validarCompatibilidadeCompleted(dados, status) {
  if (
    Object.hasOwn(dados, "completed") &&
    typeof dados.completed !== "boolean"
  ) {
    throw criarErro(400, "O campo completed deve ser verdadeiro ou falso.");
  }
  if (
    Object.hasOwn(dados, "completed") &&
    Object.hasOwn(dados, "status") &&
    dados.completed !== (status === "completed")
  ) {
    throw criarErro(
      400,
      "Os campos completed e status não podem indicar estados diferentes.",
    );
  }
}

class ServiceTarefa {
  Listar() {
    return ModelTarefa.ListarTodos();
  }

  BuscarPorId(id) {
    const tarefa = ModelTarefa.BuscarPorId(id);
    if (!tarefa) throw criarErro(404, "Tarefa não encontrada.");
    return tarefa;
  }

  Criar(dados) {
    validarObjeto(dados);
    const description = validarDescricao(dados.description);
    const title = Object.hasOwn(dados, "title")
      ? validarTexto(dados.title, "Informe um título para a tarefa.")
      : description;
    const status = Object.hasOwn(dados, "status")
      ? validarStatus(dados.status)
      : dados.completed === true
        ? "completed"
        : "pending";
    validarCompatibilidadeCompleted(dados, status);

    return ModelTarefa.Criar({ title, description, status });
  }

  Atualizar(id, dados) {
    validarObjeto(dados);
    const campos = Object.keys(dados);
    if (campos.length === 0) {
      throw criarErro(400, "Informe ao menos um campo para atualizar.");
    }

    const alteracoes = {};
    if (Object.hasOwn(dados, "title")) {
      alteracoes.title = validarTexto(
        dados.title,
        "Informe um título para a tarefa.",
      );
    }
    if (Object.hasOwn(dados, "description")) {
      alteracoes.description = validarDescricao(dados.description);
    }
    if (Object.hasOwn(dados, "status")) {
      alteracoes.status = validarStatus(dados.status);
    } else if (Object.hasOwn(dados, "completed")) {
      if (typeof dados.completed !== "boolean") {
        throw criarErro(400, "O campo completed deve ser verdadeiro ou falso.");
      }
      alteracoes.status = dados.completed ? "completed" : "pending";
    }
    if (Object.hasOwn(dados, "completed") && Object.hasOwn(dados, "status")) {
      validarCompatibilidadeCompleted(dados, alteracoes.status);
    }

    const tarefa = ModelTarefa.Atualizar(id, alteracoes);
    if (!tarefa) throw criarErro(404, "Tarefa não encontrada.");
    return tarefa;
  }

  Deletar(id) {
    if (!ModelTarefa.Deletar(id))
      throw criarErro(404, "Tarefa não encontrada.");
  }
}

export default new ServiceTarefa();

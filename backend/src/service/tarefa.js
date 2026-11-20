import ModelTarefa from "../model/tarefa.js";

const camposPermitidos = new Set(["description", "completed"]);

function criarErro(status, mensagem) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

function validarObjeto(dados) {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    throw criarErro(400, "Envie os dados da tarefa em um objeto JSON.");
  }

  const camposInvalidos = Object.keys(dados).filter((campo) => !camposPermitidos.has(campo));
  if (camposInvalidos.length > 0) {
    throw criarErro(400, `Campo(s) não permitido(s): ${camposInvalidos.join(", ")}.`);
  }
}

function validarDescricao(description) {
  if (typeof description !== "string" || !description.trim()) {
    throw criarErro(400, "Informe uma descrição para a tarefa.");
  }

  return description.trim();
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
    const completed = Object.hasOwn(dados, "completed") ? dados.completed : false;
    if (typeof completed !== "boolean") {
      throw criarErro(400, "O campo completed deve ser verdadeiro ou falso.");
    }

    return ModelTarefa.Criar({ description, completed });
  }

  Atualizar(id, dados) {
    validarObjeto(dados);
    const campos = Object.keys(dados);
    if (campos.length === 0) {
      throw criarErro(400, "Informe ao menos um campo para atualizar.");
    }

    const alteracoes = {};
    if (Object.hasOwn(dados, "description")) {
      alteracoes.description = validarDescricao(dados.description);
    }
    if (Object.hasOwn(dados, "completed")) {
      if (typeof dados.completed !== "boolean") {
        throw criarErro(400, "O campo completed deve ser verdadeiro ou falso.");
      }
      alteracoes.completed = dados.completed;
    }

    const tarefa = ModelTarefa.Atualizar(id, alteracoes);
    if (!tarefa) throw criarErro(404, "Tarefa não encontrada.");
    return tarefa;
  }

  Deletar(id) {
    if (!ModelTarefa.Deletar(id)) throw criarErro(404, "Tarefa não encontrada.");
  }
}

export default new ServiceTarefa();

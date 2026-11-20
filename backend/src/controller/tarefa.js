import ServiceTarefa from "../service/tarefa.js";

class ControllerTarefa {
  Listar(req, res) {
    res.status(200).json(ServiceTarefa.Listar());
  }

  BuscarPorId(req, res) {
    res.status(200).json(ServiceTarefa.BuscarPorId(req.params.id));
  }

  Criar(req, res) {
    const tarefa = ServiceTarefa.Criar(req.body);
    res.status(201).json(tarefa);
  }

  Atualizar(req, res) {
    const tarefa = ServiceTarefa.Atualizar(req.params.id, req.body);
    res.status(200).json(tarefa);
  }

  Deletar(req, res) {
    ServiceTarefa.Deletar(req.params.id);
    res.status(204).end();
  }
}

export default new ControllerTarefa();

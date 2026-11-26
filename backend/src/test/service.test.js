import assert from "node:assert/strict";
import { describe, it } from "node:test";
import ServiceTarefa from "../service/tarefa.js";

function assertErroServico(acao, status, mensagem) {
  assert.throws(acao, (erro) => {
    assert.equal(erro.status, status);
    assert.equal(erro.message, mensagem);
    return true;
  });
}

describe("regras unitárias do serviço de tarefas", () => {
  it("rejeita criação sem descrição", () => {
    assertErroServico(
      () => ServiceTarefa.Criar({ title: "Revisar API" }),
      400,
      "Informe uma descrição para a tarefa.",
    );
  });

  it("rejeita título vazio", () => {
    assertErroServico(
      () =>
        ServiceTarefa.Criar({
          title: "   ",
          description: "Revisar endpoints",
        }),
      400,
      "Informe um título para a tarefa.",
    );
  });

  it("rejeita status não suportado", () => {
    assertErroServico(
      () =>
        ServiceTarefa.Criar({
          title: "Revisar API",
          description: "Revisar endpoints",
          status: "started",
        }),
      400,
      "O status deve ser pending, in-progress ou completed.",
    );
  });

  it("rejeita campos completed e status incompatíveis", () => {
    assertErroServico(
      () =>
        ServiceTarefa.Criar({
          title: "Revisar API",
          description: "Revisar endpoints",
          status: "pending",
          completed: true,
        }),
      400,
      "Os campos completed e status não podem indicar estados diferentes.",
    );
  });

  it("rejeita atualização sem campos", () => {
    assertErroServico(
      () => ServiceTarefa.Atualizar("1", {}),
      400,
      "Informe ao menos um campo para atualizar.",
    );
  });
});

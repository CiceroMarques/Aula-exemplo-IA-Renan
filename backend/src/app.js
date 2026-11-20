import express from "express";
import tarefaRouter from "./router/tarefa.js";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use("/api/tarefas", tarefaRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

app.use((erro, req, res, next) => {
  if (res.headersSent) return next(erro);

  const status =
    Number.isInteger(erro.status) && erro.status >= 400 && erro.status < 500 ? erro.status : 500;

  if (status >= 500) console.error("Erro ao processar a requisição:", erro);

  res.status(status).json({
    error: status === 500 ? "Erro interno do servidor." : erro.message,
  });
});

export default app;

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const tarefas = [
  { id: 1, titulo: "Estudar JavaScript", concluida: false },
  { id: 2, titulo: "Fazer exercícios", concluida: true },
  { id: 3, titulo: "Criar uma API REST", concluida: false },
];

const servidor = http.createServer((requisicao, resposta) => {
  if (requisicao.method === "GET" && requisicao.url === "/api/tarefas") {
    resposta.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    resposta.end(JSON.stringify(tarefas));
    return;
  }

  if (requisicao.method === "GET" && requisicao.url === "/") {
    fs.readFile(path.join(__dirname, "frontend.html"), (erro, conteudo) => {
      if (erro) {
        console.error("Erro ao carregar frontend.html:", erro);
        resposta.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        resposta.end("Erro ao carregar a página.");
        return;
      }

      resposta.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      resposta.end(conteudo);
    });
    return;
  }

  resposta.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  resposta.end(JSON.stringify({ erro: "Rota não encontrada" }));
});

const porta = 3000;
servidor.listen(porta, "127.0.0.1", () => {
  console.log(`Servidor disponível em http://localhost:${porta}`);
});

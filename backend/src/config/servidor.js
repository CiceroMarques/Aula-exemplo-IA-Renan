const porta = Number(process.env.PORT ?? 3001);

if (!Number.isInteger(porta) || porta < 1 || porta > 65535) {
  throw new Error("A variável PORT deve ser um número entre 1 e 65535.");
}

export default { porta };

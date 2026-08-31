import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErroDeDominio } from "../errors/DomainError.js";

// Último middleware da cadeia. Traduz erro em resposta HTTP — nenhum controlador
// precisa de try/catch para isso (o Express 5 encaminha erro de função async sozinho).
export function tratadorDeErros(
  erro: unknown,
  _req: Request,
  res: Response,
  _proximo: NextFunction,
) {
  if (erro instanceof ZodError) {
    return res.status(422).json({
      erro: "dados inválidos",
      detalhes: erro.issues.map((i) => ({ campo: i.path.join("."), mensagem: i.message })),
    });
  }

  if (erro instanceof ErroDeDominio) {
    return res.status(erro.status).json({ erro: erro.message });
  }

  console.error("erro inesperado:", erro);
  return res.status(500).json({ erro: "erro interno" });
}

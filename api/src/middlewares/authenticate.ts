import type { NextFunction, Request, Response } from "express";
import { ErroDeDominio } from "../errors/DomainError.js";

// Protege uma rota: sem `Authorization: Bearer <token>` a requisição para aqui
// com 401. Quem passa ganha `res.locals.usuarioId`, que o controlador repassa
// ao serviço — o serviço nunca lê header.
//
// LIMITE: enquanto a fatia A (#1) não entrega o login, o token É o id do
// usuário, sem assinatura nem validade. Qualquer um que saiba um id vê as URLs
// daquela conta. A fatia A troca só o corpo de `usuarioDoToken` pela
// verificação do token de verdade (assinatura, expiração) — as rotas continuam
// iguais.
export function autenticar(req: Request, res: Response, proximo: NextFunction) {
  const [esquema, token] = (req.headers.authorization ?? "").split(" ");

  if (esquema !== "Bearer" || !token) {
    throw new ErroDeDominio("faça login para continuar", 401);
  }

  res.locals.usuarioId = usuarioDoToken(token);
  proximo();
}

function usuarioDoToken(token: string): string {
  return token;
}

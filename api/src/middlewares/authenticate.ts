import { NextFunction, Request, Response } from "express";
import { ErroDeDominio } from "../errors/DomainError.js";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../utils/constants.js";

export function autenticar(req: Request, res: Response, proximo: NextFunction) {
  const token: string = req.cookies.accessToken;
  if (!token) throw new ErroDeDominio("Não autenticado", 409);

  try {
    const payload = jwt.verify(token, ACCESS_SECRET) as { sub: string };
    req.userId = payload.sub;
    proximo();
  } catch {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

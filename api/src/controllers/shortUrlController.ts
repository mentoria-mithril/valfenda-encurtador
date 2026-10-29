import type { Request, Response } from "express";
import { listarHistorico } from "../services/shortUrlService.js";

export async function obterHistorico(_req: Request, res: Response) {
  const historico = await listarHistorico(res.locals.usuarioId);
  res.json(historico);
}

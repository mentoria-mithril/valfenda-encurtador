import type { Request, Response } from "express";
import { listarHistorico } from "../services/shortUrlService.js";

export async function obterHistorico(req: Request, res: Response) {
  const historico = await listarHistorico(req.userId);
  res.json(historico);
}

import type { Request, Response } from "express";
import { verificarSaude } from "../services/saudeServico.js";

// O controlador só faz entrada e saída de HTTP: lê da requisição, chama o
// serviço, escolhe o status. Regra de negócio aqui dentro é PR recusado.
export async function obterSaude(_req: Request, res: Response) {
  const saude = await verificarSaude();
  res.json(saude);
}

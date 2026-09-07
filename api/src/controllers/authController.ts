import { Request, Response } from 'express'
import { loginSchema } from "../schemas/authSchemas.js";
import { verificaExiste } from "../services/authService.js";

export async function obterLogin(
  req: Request,
  res: Response
) {
    const inputLogin = loginSchema.parse(req.body)
    const usuario = await verificaExiste(inputLogin)
    return res.status(200).json(usuario)
}

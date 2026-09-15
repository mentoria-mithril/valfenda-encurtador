import { Request, Response } from 'express'
import { loginSchema } from "../schemas/authSchemas.js";
import { trataUsuarioPeloId, verificaExiste } from "../services/authService.js";
import { gerarAccessToken } from '../utils/jwt.js';

export async function obterLogin(
  req: Request,
  res: Response
) {
    const inputLogin = loginSchema.parse(req.body)
    const usuario = await verificaExiste(inputLogin)

    const accessToken = gerarAccessToken(usuario.id)

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 dia
    })

    return res.status(200).json(usuario)
}

export async function obterDadosUsuario(req: Request, res: Response){
  const usuario = await trataUsuarioPeloId(req.userId)

  return res.status(200).json(usuario)
}

export function logout(_req: Request, res: Response) {
  res.clearCookie("accessToken");

  return res.json({ ok: true });
}

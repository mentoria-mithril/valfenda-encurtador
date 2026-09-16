import { Request, Response } from 'express'
import { loginSchema } from "../schemas/authSchemas.js";
import { trataUsuarioPeloId, verificaExiste } from "../services/authService.js";
import { gerarAccessToken } from '../utils/jwt.js';
import { DURACAO_UM_Dia } from '../utils/constants.js';
import { Login, UsuarioPublico } from '../types/user.js';

export async function obterLogin(
  req: Request,
  res: Response
) {
    const inputLogin: Login = loginSchema.parse(req.body)
    const usuarioPublico: UsuarioPublico = await verificaExiste(inputLogin)

    const accessToken: string = gerarAccessToken(usuarioPublico.id)

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: DURACAO_UM_Dia
    })

    return res.status(200).json(usuarioPublico)
}

export async function obterDadosUsuario(req: Request, res: Response){
  const usuarioPublico: UsuarioPublico = await trataUsuarioPeloId(req.userId)

  return res.status(200).json(usuarioPublico)
}

export function logout(_req: Request, res: Response) {
  res.clearCookie("accessToken");

  return res.json({ ok: true });
}

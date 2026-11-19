import bcrypt from "bcryptjs";
import { ErroDeDominio } from "../errors/DomainError.js";
import {
  buscaUsuarioPeloEmail,
  buscaUsuarioPeloId,
} from "../repositories/userRepository.js";
import { Login, UsuarioCompleto, UsuarioPublico } from "../types/user.js";

export async function verificaExiste(login: Login): Promise<UsuarioPublico> {
  const usuario: UsuarioCompleto = await buscaUsuarioPeloEmail(login.email);
  if (!usuario) throw new ErroDeDominio("Email ou senha inválida", 401);

  const isSenhaCorreta: boolean = await bcrypt.compare(login.senha, usuario.senha);
  if (!isSenhaCorreta) throw new ErroDeDominio("Email ou senha inválida", 401);

  const { senha, ...usuarioPublico } = usuario;

  return usuarioPublico;
}

export async function trataUsuarioPeloId(id: string | undefined): Promise<UsuarioPublico> {
  if (!id) throw new ErroDeDominio("Id do usuário inválido", 401);

  const usuarioPublico: UsuarioPublico | null = await buscaUsuarioPeloId(id);
  if (!usuarioPublico) throw new ErroDeDominio("Usuário não existe", 401);

  return usuarioPublico;
}

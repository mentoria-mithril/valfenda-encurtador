import bcrypt from "bcryptjs";
import { ErroDeDominio } from "../errors/DomainError.js";
import { verificaEmail } from "../repositories/authRepository.js";
import { Login } from "../schemas/authSchemas.js";

export async function verificaExiste({ email, senha }: Login) {
  const usuario = await verificaEmail(email);
  if (!usuario) throw new ErroDeDominio("Email ou senha inválida", 409);

  const isSenhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!isSenhaCorreta) throw new ErroDeDominio("Email ou senha inválida", 409);

  const usuarioSemSenha = { ...usuario, senha: undefined }

  return usuarioSemSenha;
}

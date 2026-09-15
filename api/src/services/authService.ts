import bcrypt from "bcryptjs";
import { ErroDeDominio } from "../errors/DomainError.js";
import { buscaEmail } from "../repositories/authRepository.js";
import { Login } from "../schemas/authSchemas.js";
import { usuarioPublico } from "../utils/publicUser.js";
import { buscaUsuarioPeloId } from "../repositories/userRepository.js";

export type RetornoLogin = {
  id: string;
  nome: string;
  email: string;
};

export async function verificaExiste({
  email,
  senha,
}: Login): Promise<RetornoLogin> {
  const usuario = await buscaEmail(email);
  if (!usuario) throw new ErroDeDominio("Email ou senha inválida", 409);

  const isSenhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!isSenhaCorreta) throw new ErroDeDominio("Email ou senha inválida", 409);

  return usuarioPublico(usuario);
}

export async function trataUsuarioPeloId(id: string | undefined) {
  if (!id) throw new ErroDeDominio("Id do usuário inválido", 409);
  
  const usuario = await buscaUsuarioPeloId(id);
  if (!usuario) throw new ErroDeDominio("Usuário não existe", 409);

  return usuarioPublico(usuario);
}

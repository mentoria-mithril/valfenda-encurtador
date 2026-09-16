import { prisma } from "../prisma.js";
import { Cadastro, UsuarioCompleto, UsuarioPublico } from "../types/user.js";

export async function adicionaUsuario(usuario: Cadastro): Promise<void> {
  await prisma.usuario.create({ data: usuario });
}

export async function buscaUsuarioPeloEmail(email: string): Promise<UsuarioCompleto> {
  return await prisma.usuario.findUnique({
    where: { email: email },
    omit: { dtAtualizacao: true, dtCriacao: true },
  });
}

export async function buscaUsuarioPeloId(id: string): Promise<UsuarioPublico | null> {
  return await prisma.usuario.findUnique({
    where: { id: id },
    omit: { senha: true, dtAtualizacao: true, dtCriacao: true },
  });
}

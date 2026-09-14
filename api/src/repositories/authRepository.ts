import { prisma } from "../prisma.js";

export type Usuario = {
  email: string;
  senha: string;
  id: string;
  nome: string;
  dtCriacao: Date;
  dtAtualizacao: Date;
} | null

export async function buscaEmail(email: string): Promise<Usuario> {
  return await prisma.usuario.findUnique({ where: { email: email } });
}

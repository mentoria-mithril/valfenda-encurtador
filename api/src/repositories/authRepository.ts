import { prisma } from "../prisma.js";

export async function verificaEmail(email: string): Promise<{
  email: string;
  senha: string;
  id: string;
  nome: string;
  dtCriacao: Date;
  dtAtualizacao: Date;
} | null> {
  return await prisma.usuario.findUnique({ where: { email: email } });
}

import { prisma } from "../prisma.js";

// LIMITE: sem paginação (fora de escopo na #4). Uma conta com milhares de URLs
// traz todas de uma vez; quando doer, vira cursor por dtCriacao + codigo.
export function listarPorUsuario(usuarioId: string) {
  return prisma.urlEncurtada.findMany({
    where: { usuarioId },
    // Mais recente primeiro. `codigo` desempata URLs criadas no mesmo instante,
    // senão a ordem muda de uma consulta para outra.
    orderBy: [{ dtCriacao: "desc" }, { codigo: "asc" }],
  });
}

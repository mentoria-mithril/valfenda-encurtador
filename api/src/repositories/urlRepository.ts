import { prisma } from "../prisma.js";

// Único lugar do arquivo que conhece o Prisma para esse domínio.
export function buscarUrlPorCodigo(codigo: string) {
  return prisma.urlEncurtada.findUnique({ where: { codigo } });
}

export function salvarUrlEncurtada(dados: {
  codigo: string;
  urlOriginal: string;
  usuarioId?: string | null;
}) {
  return prisma.urlEncurtada.create({
    data: {
      codigo: dados.codigo,
      urlOriginal: dados.urlOriginal,
      usuarioId: dados.usuarioId ?? null,
    },
  });
}
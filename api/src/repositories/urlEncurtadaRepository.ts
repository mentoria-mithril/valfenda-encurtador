import { prisma } from "../prisma.js";

export async function incrementarAcessos(codigo: string): Promise<void> {
    await prisma.urlEncurtada.update({
        where: {
            codigo,
        },
        data: {
            qtdAcessos: {
                increment: 1,
            }
        }
    });
}

export async function findByCodigo(codigo: string): Promise<string | null>{
    const registro: {urlOriginal: string} | null = await prisma.urlEncurtada.findUnique({
        where: {
            codigo: codigo,
        },
        select: {
            urlOriginal: true,
        }
    });

    const urlOriginal: string | null = registro?.urlOriginal ?? null;
    return urlOriginal;
}

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
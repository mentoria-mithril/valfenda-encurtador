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
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
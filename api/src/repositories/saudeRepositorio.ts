import { prisma } from "../prisma.js";

// Único lugar do arquivo que conhece o Prisma. É esse o padrão a copiar.
export async function pingar(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
}

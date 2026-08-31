import { PrismaClient } from "@prisma/client";

// Uma instância só para a aplicação inteira. Abrir uma por requisição estoura
// o limite de conexões do Postgres.
export const prisma = new PrismaClient();

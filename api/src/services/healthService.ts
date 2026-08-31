import { pingar } from "../repositories/healthRepository.js";

// A regra de negócio mora aqui. Este serviço é o exemplo mínimo: ele não sabe
// que existe HTTP, não recebe `req` nem `res`, e não fala com o Prisma —
// pede o dado ao repositório e devolve.
export async function verificarSaude() {
  await pingar();
  return { api: "ok" as const, banco: "ok" as const, em: new Date().toISOString() };
}

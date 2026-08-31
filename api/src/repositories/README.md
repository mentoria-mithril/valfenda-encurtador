# repositories/

Acesso ao banco. É o único lugar do código que fala `prisma.`.

Serviço que importa `prisma` direto funciona — e fica impossível de testar sem
subir Postgres. Por isso a consulta mora aqui e o serviço recebe o dado pronto.

```ts
import { prisma } from "../prisma.js";

export function buscarPorCodigo(codigo: string) {
  return prisma.urlEncurtada.findUnique({ where: { codigo } });
}
```

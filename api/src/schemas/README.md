# schemas/

Contratos de entrada, escritos em Zod. Um arquivo por recurso.

O esquema é a **fronteira**: depois que o dado passa por ele, o resto do código
confia no formato. Nada de `as any` do outro lado.

```ts
import { z } from "zod";

export const criarUrlEncurtadaEsquema = z.object({
  url_original: z.string().url("precisa ser uma URL válida"),
  alias: z.string().min(3).max(30).regex(/^[a-z0-9-]+$/).optional(),
});

export type CriarUrlEncurtada = z.infer<typeof criarUrlEncurtadaEsquema>;
```

No controlador: `const dados = criarUrlEncurtadaEsquema.parse(req.body);`
O `ZodError` sobe sozinho e o `tratadorDeErros` devolve 422.

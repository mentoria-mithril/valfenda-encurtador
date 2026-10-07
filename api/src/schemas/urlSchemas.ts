import { z } from "zod";

export const criarUrlEncurtadaEsquema = z.object({
  url_original: z.string().trim().url("precisa ser uma URL válida"),
  alias: z
    .string()
    .trim()
    .min(3, "alias muito curto")
    .max(30, "alias muito longo")
    .regex(/^[a-z0-9-]+$/, "alias só pode ter letras minúsculas, números e hífen")
    .optional(),
});

export type CriarUrlEncurtada = z.infer<typeof criarUrlEncurtadaEsquema>;
import { z } from "zod";


const protocolos = ["http:", "https:"] ;


export const criarUrlEncurtadaEsquema = z.object({
  url_original: z
  .string()
  .trim()
  .max(2222, "url muito longa")
  .url("precisa ser uma URL válida")
  .refine(
    (valor) => protocolos.includes(new URL(valor).protocol)
    , "precisa ser uma URL com protocolo http ou https") ,
  
  
  
  alias: z
    .string()
    .trim()
    .min(3, "alias muito curto")
    .max(30, "alias muito longo")
    .regex(/^[a-z0-9-]+$/, "alias só pode ter letras minúsculas, números e hífen")
    .optional(),
});

export type CriarUrlEncurtada = z.infer<typeof criarUrlEncurtadaEsquema>;
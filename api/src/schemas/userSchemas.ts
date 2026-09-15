import z from "zod";

export const usuarioSchema = z.object({
  nome: z.string().min(1, "Preenchimento obrigatório"),
  email: z.string().email("E-mail inválido."),
  senha: z.string().min(1, "Preenchimento obrigatório"),
});

export type UsuarioInput = z.infer<typeof usuarioSchema>;

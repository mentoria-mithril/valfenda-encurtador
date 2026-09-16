import z from "zod";
import { usuarioSchema } from "../schemas/userSchemas.js";
import { loginSchema } from "../schemas/authSchemas.js";

export type UsuarioPublico = {
  id: string;
  nome: string;
  email: string;
};

export type UsuarioCompleto = {
  id: string;
  nome: string;
  email: string;
  senha: string;
} | null;

export type Cadastro = z.infer<typeof usuarioSchema>;
export type Login = z.infer<typeof loginSchema>;

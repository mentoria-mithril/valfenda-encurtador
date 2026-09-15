import { pedir } from "./api";

export type Usuario = {
  nome: string;
  email: string;
  senha: string;
};

export async function criaUsuario(usuario: Usuario) {
  await pedir<void>("/usuarios", {
    method: "POST",
    body: JSON.stringify(usuario),
  });
}

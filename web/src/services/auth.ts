import { pedir } from "./api";

export type Login = { email: string; senha: string };
export type RetornoLogin = {
  email: string;
  id: string;
  nome: string;
  dtCriacao: Date;
  dtAtualizacao: Date;
};

export function EnviaLogin(login: Login) {
  return pedir<RetornoLogin>("/auth", {
    method: "POST",
    body: JSON.stringify(login),
  });
}

import { pedir } from "./api";

export type Login = { email: string; senha: string };
export type RetornoLogin = {
  id: string;
  nome: string;
  email: string;
};

export function EnviaLogin(login: Login) {
  return pedir<RetornoLogin>("/auth", {
    method: "POST",
    body: JSON.stringify(login),
  });
}

export function getUsuarioSessao() {
  return pedir<RetornoLogin>("/auth/me", {
    method: "GET",
  });
}

export async function logout(){
    await pedir<void>("/auth/logout")
}

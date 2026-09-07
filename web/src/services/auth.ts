import { pedir } from "./api";

export type Login = { email: string; senha: string };

export function EnviaLogin(login: Login) {
    return pedir<Login>("/auth", {
        method: "POST",
        body: JSON.stringify(login)
    })
}

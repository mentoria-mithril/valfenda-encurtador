import { pedir } from "./api";

export async function logout(){
    await pedir<void>("/logout")
}
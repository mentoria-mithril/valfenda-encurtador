import { pedir } from "./api.js";

export type Saude = { api: "ok"; banco: "ok"; em: string };

export function consultarSaude() {
  return pedir<Saude>("/saude");
}

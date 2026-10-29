import { pedir } from "./api.js";

export type UrlEncurtada = {
  codigo: string;
  urlOriginal: string;
  urlEncurtada: string;
  qtdAcessos: number;
  dtCriacao: string;
};

export function listarUrls() {
  return pedir<UrlEncurtada[]>("/urls-encurtadas");
}

export function removerUrl(codigo: string) {
  return pedir<void>(`/urls-encurtadas/${codigo}`, { method: "DELETE" });
}

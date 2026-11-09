import { pedir } from "./api.js";

export type UrlEncurtada = {
  codigo: string;
  url_original: string;
  url_encurtada: string;
  qtd_acessos: number;
  dt_criacao: string;
};

export function listarUrls() {
  return pedir<UrlEncurtada[]>("/urls-encurtadas");
}

export function removerUrl(codigo: string) {
  return pedir<void>(`/urls-encurtadas/${codigo}`, { method: "DELETE" });
}

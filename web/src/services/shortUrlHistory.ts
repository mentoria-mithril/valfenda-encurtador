import { pedir } from "./api.js";

export type ItemDoHistorico = {
  codigo: string;
  url_original: string;
  url_encurtada: string;
  qtd_acessos: number;
  dt_criacao: string;
};

export function listarHistorico() {
  return pedir<ItemDoHistorico[]>("/urls-encurtadas", {
    method: "GET"
  });
}

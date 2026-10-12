import { pedir } from './api';

export interface CreateUrlPayload {
  url_original: string;
  alias?: string;
}


export interface UrlEncurtada { // Interface para representar a URL encurtada retornada pelo backend
  codigo: string;
  url_original: string;
  usuario_id: string | null;
  dt_criacao: string;
  qtd_acessos: number;
  url_encurtada: string;
  qrcode: string;
}


export function encurtarUrl(payload: CreateUrlPayload) {
  return pedir<UrlEncurtada>('/urls-encurtadas', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function verificarAliasDisponivel(alias: string): Promise<boolean> {
  try {
    await pedir(`/${alias}`, { method: 'GET' });
    return false;
  } catch {
    return true;
  }
}
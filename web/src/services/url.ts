import { pedir } from './api';

export interface CreateUrlPayload {
  url_original: string;
  alias?: string;
}

export function encurtarUrl(payload: CreateUrlPayload) {
  return pedir('/urls-encurtadas', {
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
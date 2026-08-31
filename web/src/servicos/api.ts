// Único ponto do front que sabe fazer HTTP. Toda tela chama daqui.
// Erro da API vira exceção com a mensagem que o backend mandou.
export async function pedir<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const resposta = await fetch(`/api${caminho}`, {
    ...opcoes,
    headers: { "Content-Type": "application/json", ...opcoes.headers },
  });

  const corpo = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(corpo?.erro ?? `falha na requisição (${resposta.status})`);
  }

  return corpo as T;
}

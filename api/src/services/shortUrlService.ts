import { ambiente } from "../env.js";
import { ErroDeDominio } from "../errors/DomainError.js";
import { listarPorUsuario } from "../repositories/shortUrlRepository.js";

export type ItemDoHistorico = {
  codigo: string;
  url_original: string;
  url_encurtada: string;
  qtd_acessos: number;
  dt_criacao: string;
};

// Histórico de quem está logado. O filtro por usuário mora no repositório e
// recebe o id que veio do token — nunca um id escolhido pelo cliente.
export async function listarHistorico(usuarioId: string | undefined): Promise<ItemDoHistorico[]> {
  if(!usuarioId) throw new ErroDeDominio("Id do usuário inválido", 409);
  const urls = await listarPorUsuario(usuarioId);

  return urls.map((url) => ({
    codigo: url.codigo,
    url_original: url.urlOriginal,
    // O link curto é servido pela raiz da API (fatia C: GET /:codigo).
    url_encurtada: `${ambiente.urlBase}/${url.codigo}`,
    qtd_acessos: url.qtdAcessos,
    dt_criacao: url.dtCriacao.toISOString(),
  }));
}

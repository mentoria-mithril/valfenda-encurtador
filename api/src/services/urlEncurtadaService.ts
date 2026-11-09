import { incrementarAcessos, findByCodigo, listarPorUsuario, buscarUrlPorCodigo, salvarUrlEncurtada } from "../repositories/urlEncurtadaRepository.js";
import { ErroDeDominio, NaoEncontrado } from "../errors/DomainError.js"
import { ambiente } from "../env.js";
import { randomBytes } from "crypto";
import { CriarUrlEncurtada } from "../schemas/urlEncurtadaSchema.js";
import QRCode from "qrcode";

export type ItemDoHistorico = {
  codigo: string;
  url_original: string;
  url_encurtada: string;
  qtd_acessos: number;
  dt_criacao: string;
};


export async function urlEncurtadaService(codigo: string): Promise<string> {
    const urlOriginal: string | null = await findByCodigo(codigo);

    if (urlOriginal === null){
        throw new NaoEncontrado("URL não encontrada");
    }

    await incrementarAcessos(codigo);
    return urlOriginal;
}
// Histórico de quem está logado. O filtro por usuário mora no repositório e
// recebe o id que veio do token — nunca um id escolhido pelo cliente.
export async function listarHistorico(usuarioId: string | undefined): Promise<ItemDoHistorico[]> {
  if(!usuarioId) throw new ErroDeDominio("Id do usuário inválido", 409);
  const urls = await listarPorUsuario(usuarioId);

  return urls.map((url: { codigo: any; urlOriginal: any; qtdAcessos: any; dtCriacao: { toISOString: () => any; }; }) => ({
    codigo: url.codigo,
    url_original: url.urlOriginal,
    // O link curto é servido pela raiz da API (fatia C: GET /:codigo).
    url_encurtada: `${ambiente.urlBase}/${url.codigo}`,
    qtd_acessos: url.qtdAcessos,
    dt_criacao: url.dtCriacao.toISOString(),
  }));
}

function gerarCodigoAleatorio(tamanho = 10): string {
  return randomBytes(tamanho).toString("base64url").slice(0, tamanho);
}

export async function criarUrlEncurtada(dados: CriarUrlEncurtada, usuarioId?: string) {
  let codigo: string;

  if (dados.alias) {
    const existente = await buscarUrlPorCodigo(dados.alias);
    if (existente) {
      throw new ErroDeDominio("Alias já em uso", 409);
    }
    codigo = dados.alias;
  } else {
    do {
      codigo = gerarCodigoAleatorio(10);
    } while (await buscarUrlPorCodigo(codigo));
  }


  const urlEncurtada = `${ambiente.urlBase}/${codigo}`;// montando a url encurtada com o codigo gerado

  const qrcode = await QRCode.toDataURL(urlEncurtada); // gerando o qrcode da url encurtada

  const urlCriada = await salvarUrlEncurtada({ // salvando a url encurtada no banco de dados
    codigo,
    urlOriginal: dados.url_original,
    usuarioId: usuarioId ?? null,
  });

  return { ...urlCriada, qrcode, urlEncurtada }; // retornando a url encurtada com o qrcode gerado
}

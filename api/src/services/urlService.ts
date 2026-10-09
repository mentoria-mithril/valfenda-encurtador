import { randomBytes } from "node:crypto";
import { buscarUrlPorCodigo, salvarUrlEncurtada } from "../repositories/urlRepository.js";
import { ErroDeDominio } from "../errors/DomainError.js";
import type { CriarUrlEncurtada } from "../schemas/urlSchemas.js";
import { ambiente } from "../env.js";
import QRCode from "qrcode";


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

 

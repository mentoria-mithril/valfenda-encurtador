import { randomBytes } from "node:crypto";
import { buscarUrlPorCodigo, salvarUrlEncurtada } from "../repositories/urlRepository.js";
import { ErroDeDominio } from "../errors/DomainError.js";
import type { CriarUrlEncurtada } from "../schemas/urlSchemas.js";

function gerarCodigoAleatorio(tamanho = 10): string {
  return randomBytes(tamanho).toString("base64url").slice(0, tamanho);
}

export async function criarUrlEncurtada(dados: CriarUrlEncurtada, usuarioId?: string) {
  let codigo: string;

  if (dados.alias) {
    const existente = await buscarUrlPorCodigo(dados.alias);
    if (existente) {
      throw new ErroDeDominio("alias já em uso", 409);
    }
    codigo = dados.alias;
  } else {
    do {
      codigo = gerarCodigoAleatorio(10);
    } while (await buscarUrlPorCodigo(codigo));
  }

  return salvarUrlEncurtada({
    codigo,
    urlOriginal: dados.url_original,
    usuarioId: usuarioId ?? null,
  });
}
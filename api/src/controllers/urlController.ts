import type { Request, Response } from "express";
import { criarUrlEncurtadaEsquema } from "../schemas/urlSchemas.js";
import { criarUrlEncurtada } from "../services/urlService.js";
import { urlEncurtadaParamsSchema } from "../schemas/urlEncurtadaSchema.js";
import { excluirUrlService } from "../services/urlEncurtadaService.js";

export async function criarUrl(req: Request, res: Response) {
  const dados = criarUrlEncurtadaEsquema.parse(req.body);
  // Sem login por enquanto: a URL fica sem dono (usuario_id nulo).
  // Quando a fatia A entregar o login, passar o id do token aqui.
  const urlCriada = await criarUrlEncurtada(dados);

  res.status(201).json({
    codigo: urlCriada.codigo,
    url_original: urlCriada.urlOriginal,
    usuario_id: urlCriada.usuarioId,
    dt_criacao: urlCriada.dtCriacao,
    qtd_acessos: urlCriada.qtdAcessos,
    url_encurtada: urlCriada.urlEncurtada,
    qrcode: urlCriada.qrcode
  });
}

// qr code sendo gerado no serviço de encurtamento de url, e retornado para o cliente junto com a url encurtada.

export async function excluirUrlController(req: Request<{ codigo: string }>, res: Response): Promise<void> {
    const { codigo } = urlEncurtadaParamsSchema.parse(req.params);
    const usuarioId: string = req.userId!;
    await excluirUrlService(usuarioId, codigo);
    res.status(204).send();
}
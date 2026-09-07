import type { Request, Response } from "express";
import { criarUrlEncurtadaEsquema } from "../schemas/urlSchemas.js";
import { criarUrlEncurtada } from "../services/urlService.js";


export async function criarUrl(req: Request, res: Response) {
  const dados = criarUrlEncurtadaEsquema.parse(req.body);
  const usuarioId = req.usuario?.id;

  const urlCriada = await criarUrlEncurtada(dados, usuarioId);

  res.status(201).json({
    codigo: urlCriada.codigo,
    url_original: urlCriada.urlOriginal,
    usuario_id: urlCriada.usuarioId,
    dt_criacao: urlCriada.dtCriacao,
    qtd_acessos: urlCriada.qtdAcessos,
  });
}
import { incrementarAcessos, findUrlOriginalByCodigo, findByCodigo, excluirUrl } from "../repositories/urlEncurtadaRepository.js";
import { buscaUsuarioPeloId } from "../repositories/userRepository.js"
import { ErroDeDominio, NaoEncontrado } from "../errors/DomainError.js"
import { UrlEncurtada } from "@prisma/client";
import { UsuarioPublico } from "../types/user.js";

export async function urlEncurtadaService(codigo: string): Promise<string> {
    const urlOriginal: string | null = await findUrlOriginalByCodigo(codigo);

    if (urlOriginal === null){
        throw new NaoEncontrado("URL não encontrada");
    }

    await incrementarAcessos(codigo);
    return urlOriginal;
}

export async function excluirUrlService(usuarioId: string, codigoUrl: string): Promise<void> {
  const usuario: UsuarioPublico | null = await buscaUsuarioPeloId(usuarioId);
  const url: UrlEncurtada | null = await findByCodigo(codigoUrl);  
  if (url === null){
    throw new NaoEncontrado("URL não encontrada");
  }
  if (usuario?.id !== url?.usuarioId){
    throw new ErroDeDominio("Você não tem permissão para excluir esta URL", 403)
  }
  await excluirUrl(url.codigo);
}
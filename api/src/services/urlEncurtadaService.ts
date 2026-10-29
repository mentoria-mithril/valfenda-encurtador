import { incrementarAcessos, findByCodigo } from "../repositories/urlEncurtadaRepository.js";
import { NaoEncontrado } from "../errors/DomainError.js"

export async function urlEncurtadaService(codigo: string): Promise<string> {
    const urlOriginal: string | null = await findByCodigo(codigo);

    if (urlOriginal === null){
        throw new NaoEncontrado("URL não encontrada");
    }

    await incrementarAcessos(codigo);
    return urlOriginal;
}
import { incrementarAcessos, findByCodigo } from "../repositories/urlEncurtadaRepository.js";
import { NaoEncontrado } from "../errors/DomainError.js"

export async function urlEncurtadaService(codigo: string): Promise<string> {
    const urlOriginal: string | null = await findByCodigo(codigo);

    // Se não achar, Lança um erro de url Não Encontrada 
    if (urlOriginal === null){
        const erro = new NaoEncontrado("URL não encontrada");
        throw erro;
    }

    // Incrementa o contador de acessos 
    await incrementarAcessos(codigo);

    // retorna a string da url original
    return urlOriginal;
    // O redirecionamento para url original é feito no controller
}
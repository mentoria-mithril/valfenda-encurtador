import { incrementarAcessos } from "../repositories/urlEncurtadaRepository.js";

export async function urlEncurtadaService(codigo: string): Promise<void> {
    // TODO: buscar a URL no banco de dados
    // TODO: se não achar, retorna um erro 404

    // Incrementa o contador de acessos 
    await incrementarAcessos(codigo);

    // TODO: redirecionar para a URL original
}
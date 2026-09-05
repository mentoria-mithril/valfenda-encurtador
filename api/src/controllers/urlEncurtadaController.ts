import { Response } from "express";
import { Request } from "express";
import { urlEncurtadaService } from "../services/urlEncurtadaService.js";

export async function urlEncurtadaController(req: Request<{ codigo: string }>, res: Response): Promise<void> {
    const { codigo } = req.params;
    await urlEncurtadaService(codigo);

    // TODO: retornar a resposta para o cliente
    // sucesso: 302 Found -> Redireciona para a URL original;
    // erro: 404 Not Found -> Caso a URL encurtada não exista.
}
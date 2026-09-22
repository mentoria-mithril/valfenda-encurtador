import { Response } from "express";
import { Request } from "express";
import { urlEncurtadaService } from "../services/urlEncurtadaService.js";

export async function urlEncurtadaController(req: Request<{ codigo: string }>, res: Response): Promise<void> {
    const { codigo } = req.params; // url original OU alias

    const urlOriginal= await urlEncurtadaService(codigo);

    // redireciona o cliente para url original
    res.redirect(302, urlOriginal);
}
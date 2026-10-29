import { Response } from "express";
import { Request } from "express";
import { urlEncurtadaService } from "../services/urlEncurtadaService.js";
import { urlEncurtadaParamsSchema } from "../schemas/urlEncurtadaSchema.js";

export async function urlEncurtadaController(req: Request<{ codigo: string }>, res: Response): Promise<void> {
    const { codigo } = urlEncurtadaParamsSchema.parse(req.params);
    const urlOriginal= await urlEncurtadaService(codigo);
    res.redirect(302, urlOriginal);
}
import { Router } from "express";
import { urlEncurtadaController } from "../controllers/urlEncurtadaController.js";

export const redirecionamentoRotas = Router()

redirecionamentoRotas.get('/:codigo', urlEncurtadaController);


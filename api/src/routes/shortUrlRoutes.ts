import { Router } from "express";
import { obterHistorico } from "../controllers/shortUrlController.js";
import { autenticar } from "../middlewares/authenticate.js";

export const urlEncurtadaRotas = Router();

// Fatia D — histórico de quem está logado.
urlEncurtadaRotas.get("/", autenticar, obterHistorico);

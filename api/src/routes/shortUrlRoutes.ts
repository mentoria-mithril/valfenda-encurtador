import { Router } from "express";
import { obterHistorico } from "../controllers/shortUrlController.js";
import { criarUrl } from "../controllers/urlController.js"; 
import { autenticar } from "../middlewares/authenticate.js";

export const urlEncurtadaRotas = Router();

// Fatia D — histórico de quem está logado.
urlEncurtadaRotas.get("/", autenticar, obterHistorico);

// Fatia B — encurtar. Público: não usa `autenticar`.
urlEncurtadaRotas.post("/", criarUrl);
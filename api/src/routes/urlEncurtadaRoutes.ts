import { Router } from "express";
import { criarUrl, obterHistorico } from "../controllers/urlEncurtadaController.js"; 
import { autenticar } from "../middlewares/authenticate.js";


export const urlEncurtadaRotas = Router();

// Fatia D — histórico de quem está logado.
urlEncurtadaRotas.get("/", autenticar, obterHistorico);

// Fatia B — encurtar. Público: não usa `autenticar`.
urlEncurtadaRotas.post("/", criarUrl);

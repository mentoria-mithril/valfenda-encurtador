import { Router } from "express";
import { saudeRotas } from "./healthRoutes.js";
import { urlEncurtadaRotas } from './urlRoutes.js';

export const rotas = Router();

rotas.use("/saude", saudeRotas);
rotas.use('/urls-encurtadas', urlEncurtadaRotas);

// A partir daqui é trabalho de vocês. Cada fatia monta o próprio Router:
//
// rotas.use("/usuarios", usuarioRotas);            // fatia A — conta
// rotas.use("/auth", autenticacaoRotas);           // fatia A — login
// rotas.use("/urls-encurtadas", urlEncurtadaRotas) // fatias B e D
//
// O redirecionamento (fatia C) é GET /:codigo e fica fora de /api — veja o app.ts.

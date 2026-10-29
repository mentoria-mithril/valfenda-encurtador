import { Router } from "express";
import { saudeRotas } from "./healthRoutes.js";
import { authRotas } from "./authRoutes.js";
import { usuarioRotas } from "./userRoutes.js";
import { urlEncurtadaRotas } from "./shortUrlRoutes.js";

export const rotas = Router();

rotas.use("/saude", saudeRotas);
rotas.use("/usuarios", usuarioRotas)
rotas.use("/auth", authRotas);
rotas.use("/urls-encurtadas", urlEncurtadaRotas);


// A partir daqui é trabalho de vocês. Cada fatia monta o próprio Router:
//
// rotas.use("/usuarios", usuarioRotas);            // fatia A — conta
// rotas.use("/auth", autenticacaoRotas);           // fatia A — login
// rotas.use("/urls-encurtadas", ...)               // fatia B soma o POST em shortUrlRoutes.ts
//
// O redirecionamento (fatia C) é GET /:codigo e fica fora de /api — veja o app.ts.

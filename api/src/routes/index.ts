import { Router } from "express";
import { saudeRotas } from "./healthRoutes.js";
import { authRotas } from "./authRoutes.js";
import { usuarioRotas } from "./userRoutes.js";
import { urlEncurtadaRotas } from "./urlEncurtadaRoutes.js";

export const rotas = Router();

rotas.use("/saude", saudeRotas);
rotas.use("/usuarios", usuarioRotas)
rotas.use("/auth", authRotas);
rotas.use("/urls-encurtadas", urlEncurtadaRotas);


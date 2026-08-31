import { Router } from "express";
import { obterSaude } from "../controladores/saudeControlador.js";

export const saudeRotas = Router();

saudeRotas.get("/", obterSaude);

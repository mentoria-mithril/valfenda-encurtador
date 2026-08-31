import { Router } from "express";
import { obterSaude } from "../controllers/saudeControlador.js";

export const saudeRotas = Router();

saudeRotas.get("/", obterSaude);

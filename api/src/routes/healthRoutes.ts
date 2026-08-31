import { Router } from "express";
import { obterSaude } from "../controllers/healthController.js";

export const saudeRotas = Router();

saudeRotas.get("/", obterSaude);

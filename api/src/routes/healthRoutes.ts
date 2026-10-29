import { Router } from "express";
import { obterSaude } from "../controllers/healthController.js";
import { autenticar } from "../middlewares/authenticate.js";

export const saudeRotas = Router();

saudeRotas.use(autenticar)

saudeRotas.get("/", obterSaude);

import { Router } from "express";
import { criarUrl } from "../controllers/urlController.js";
import { autenticacaoMock } from '../middlewares/authMock.js';

export const urlEncurtadaRotas = Router();

urlEncurtadaRotas.post("/", autenticacaoMock ,criarUrl);
import { Router } from "express";
import { obterLogin } from "../controllers/authController.js";

export const authRotas = Router()

authRotas.post('/', obterLogin)
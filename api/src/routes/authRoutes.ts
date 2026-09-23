import { Router } from "express";
import { logout, obterDadosUsuario, obterLogin } from "../controllers/authController.js";
import { autenticar } from "../middlewares/authenticate.js";

export const authRotas = Router()

authRotas.post('/', obterLogin)
authRotas.get('/me', autenticar, obterDadosUsuario)
authRotas.use('/logout', autenticar, logout)
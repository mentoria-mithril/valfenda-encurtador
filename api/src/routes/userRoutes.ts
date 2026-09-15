import { Router } from "express";
import { registraUsuario } from "../controllers/userController.js";

export const usuarioRotas = Router()

usuarioRotas.post('/', registraUsuario)
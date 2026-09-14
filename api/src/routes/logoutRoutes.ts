import { Router } from "express";
import { logout } from "../controllers/logoutController.js";
import { autenticar } from "../middlewares/authenticate.js";

export const logoutRotas = Router();

logoutRotas.use(autenticar)

logoutRotas.use("/", logout);

import { Router } from "express";
import { logout } from "../controllers/logoutController.js";

export const logoutRotas = Router();

logoutRotas.use("/", logout);

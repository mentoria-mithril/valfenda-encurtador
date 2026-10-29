import { Router } from "express";
import { urlEncurtadaController } from "../controllers/urlEncurtadaController.js";

const router = Router();

router.get('/:codigo', urlEncurtadaController);

export default router;
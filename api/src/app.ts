import cors from "cors";
import express from "express";
import { tratadorDeErros } from "./middlewares/tratadorDeErros.js";
import { rotas } from "./routes/index.js";

export const app = express();

app.use(cors());
app.use(express.json());

// Toda a API vive sob /api. Isso deixa a raiz livre para o redirecionamento
// da URL encurtada (fatia C): GET /:codigo -> 302 para a url original.
app.use("/api", rotas);

app.use(tratadorDeErros);

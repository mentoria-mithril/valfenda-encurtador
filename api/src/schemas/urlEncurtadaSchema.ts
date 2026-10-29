import { z } from "zod";

export const urlEncurtadaParamsSchema = z.object({
    codigo: z
        .string()
        .min(1, "O código não pode estar vazio")
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            "O código deve conter apenas letras, números, hífen ou sublinhado",
        ),
});
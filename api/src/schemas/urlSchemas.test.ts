import { describe, it, expect } from "vitest";
import { criarUrlEncurtadaEsquema } from "./urlSchemas.js";

describe("Validação do schema de criação de URL encurtada", () => {
    it("Aceita uma URL HTTPS válida", () => {
        const resultado = criarUrlEncurtadaEsquema.safeParse({ url_original: "https://exemplo.com" });
        expect(resultado.success).toBe(true);
    })

    it("Rejeita uma URL que utiliza o protocolo JavaScript", () => {
        const resultado = criarUrlEncurtadaEsquema.safeParse({ url_original: "javascript:alert(1)" });
        expect(resultado.success).toBe(false);
    })

    it("Rejeita uma entrada que não corresponde a uma URL válida", () => {
        const resultado = criarUrlEncurtadaEsquema.safeParse({ url_original: "nao é url" });
        expect(resultado.success).toBe(false);
    })
})
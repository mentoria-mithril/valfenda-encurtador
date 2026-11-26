import type { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { ErroDeDominio } from "../errors/DomainError.js";
import { autenticar } from "./authenticate.js";
import { gerarAccessToken } from "../utils/jwt.js";

vi.mock("../utils/constants.js", () => ({ ACCESS_SECRET: "uma-string-longa-aleatoria-aqui" } ));

function chamar(accessToken?: string) {
  const req = { cookies: { accessToken } } as Request;
  const res = { locals: {} } as Response;
  const proximo = vi.fn();
  return { executar: () => autenticar(req, res, proximo), req, proximo };
}

describe("autenticar", () => {
  it.each([
    ["sem cookies", undefined],
    ["cookies vazio", ""],
    ["esquema errado", "Basic abc"],
    ["Bearer sem token", "Bearer "],
    ["Bearer em minúscula", "bearer abc"],
  ])("recusa com 401: %s", (_caso, accessToken) => {
    const { executar, proximo } = chamar(accessToken);

    expect(executar).toThrow(ErroDeDominio);
    try {
      executar();
    } catch (erro) {
      expect((erro as ErroDeDominio).status).toBe(401);
    }
    expect(proximo).not.toHaveBeenCalled();
  });

  it("com token, segue com o usuário em res.locals", () => {
    const { executar, req, proximo } = chamar(gerarAccessToken("u1"));

    executar();

    expect(req.userId).toBe("u1"); 
    expect(proximo).toHaveBeenCalledOnce();
  });
});

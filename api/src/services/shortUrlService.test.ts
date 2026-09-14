import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../env.js", () => ({ ambiente: { urlBase: "http://curto.test" } }));
vi.mock("../repositories/shortUrlRepository.js", () => ({ listarPorUsuario: vi.fn() }));

const { listarPorUsuario } = await import("../repositories/shortUrlRepository.js");
const { listarHistorico } = await import("./shortUrlService.js");

describe("listarHistorico", () => {
  beforeEach(() => vi.mocked(listarPorUsuario).mockReset());

  it("devolve os quatro campos do desenho de cada URL", async () => {
    vi.mocked(listarPorUsuario).mockResolvedValue([
      {
        codigo: "abc123",
        urlOriginal: "https://exemplo.com/uma/url/longa",
        usuarioId: "u1",
        dtCriacao: new Date("2026-09-14T12:00:00.000Z"),
        qtdAcessos: 7,
      },
    ]);

    const historico = await listarHistorico("u1");

    expect(listarPorUsuario).toHaveBeenCalledWith("u1");
    expect(historico).toEqual([
      {
        codigo: "abc123",
        url_original: "https://exemplo.com/uma/url/longa",
        url_encurtada: "http://curto.test/abc123",
        qtd_acessos: 7,
        dt_criacao: "2026-09-14T12:00:00.000Z",
      },
    ]);
  });

  it("conta sem URLs devolve lista vazia, não erro", async () => {
    vi.mocked(listarPorUsuario).mockResolvedValue([]);

    expect(await listarHistorico("u2")).toEqual([]);
  });
});

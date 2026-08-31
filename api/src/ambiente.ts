import "dotenv/config";

function obrigatoria(nome: string): string {
  const valor = process.env[nome];
  if (!valor) throw new Error(`variável de ambiente ausente: ${nome} (veja o .env.example)`);
  return valor;
}

export const ambiente = {
  bancoUrl: obrigatoria("DATABASE_URL"),
  porta: Number(process.env.PORTA ?? 3333),
  urlBase: process.env.URL_BASE ?? "http://localhost:3333",
};

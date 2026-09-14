// LIMITE: a fatia A (#1) decide onde o token mora depois do login. Até lá, o
// histórico lê daqui — para testar, rode no console do navegador
// `localStorage.setItem("token", "<id de um usuário>")`. A fatia A troca só
// esta função; quem pede token continua chamando `obterToken()`.
export function obterToken(): string | null {
  return localStorage.getItem("token");
}

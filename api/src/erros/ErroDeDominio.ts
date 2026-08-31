// Erro esperado, causado pelo uso: alias já existe, senha errada, url inválida.
// Diferente de um bug — por isso vira resposta HTTP e não 500.
export class ErroDeDominio extends Error {
  constructor(
    mensagem: string,
    public readonly status: number = 400,
  ) {
    super(mensagem);
    this.name = "ErroDeDominio";
  }
}

export class NaoEncontrado extends ErroDeDominio {
  constructor(mensagem = "recurso não encontrado") {
    super(mensagem, 404);
  }
}

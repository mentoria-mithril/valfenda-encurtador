import bcrypt from "bcryptjs";
import { ErroDeDominio } from "../errors/DomainError.js";
import { buscaEmail } from "../repositories/authRepository.js";
import { UsuarioInput } from "../schemas/userSchemas.js";
import { adicionaUsuario } from "../repositories/userRepository.js";

export async function salvaCadastro(cadastro: UsuarioInput): Promise<void>{
    const usuario = await buscaEmail(cadastro.email)
    if(usuario) throw new ErroDeDominio("Email já existe", 409)

    const SALT_ROUNDS = 10
    const senhaHash = await bcrypt.hash(cadastro.senha, SALT_ROUNDS)

    await adicionaUsuario({ nome: cadastro.nome, email: cadastro.email, senha: senhaHash })
}
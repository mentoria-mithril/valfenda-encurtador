import bcrypt from "bcryptjs";
import { ErroDeDominio } from "../errors/DomainError.js";
import { adicionaUsuario, buscaUsuarioPeloEmail } from "../repositories/userRepository.js";
import { Cadastro, UsuarioCompleto } from "../types/user.js";
import { SALT_ROUNDS } from "../utils/constants.js";

export async function salvaCadastro(cadastro: Cadastro): Promise<void>{
    const usuario: UsuarioCompleto = await buscaUsuarioPeloEmail(cadastro.email)
    if(usuario) throw new ErroDeDominio("Email já existe", 409)

    const senhaHash: string = await bcrypt.hash(cadastro.senha, SALT_ROUNDS)

    await adicionaUsuario({ ...cadastro, senha: senhaHash })
}
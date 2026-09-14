import { prisma } from "../prisma.js";
import { UsuarioInput } from "../schemas/userSchemas.js";
import { Usuario } from "./authRepository.js";

export async function adicionaUsuario(usuario: UsuarioInput): Promise<void>{
    await prisma.usuario.create({ data: usuario })
}

export async function buscaUsuarioPeloId(id: string): Promise<Usuario> {
    return await prisma.usuario.findUnique({ where: { id: id }})
}
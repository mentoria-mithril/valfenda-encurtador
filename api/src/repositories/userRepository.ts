import { prisma } from "../prisma.js";
import { UsuarioInput } from "../schemas/userSchemas.js";

export async function adicionaUsuario(usuario: UsuarioInput): Promise<void>{
    await prisma.usuario.create({ data: usuario })
}
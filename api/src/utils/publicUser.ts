import { Usuario } from "@prisma/client";

export function usuarioPublico(usuario: Usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };
}

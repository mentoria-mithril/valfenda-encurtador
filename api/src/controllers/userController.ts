import { Request, Response } from 'express'
import { usuarioSchema } from '../schemas/userSchemas.js'
import { salvaCadastro } from '../services/userService.js'

export async function registraUsuario(req: Request, res: Response){
    const usuarioCadastro = usuarioSchema.parse(req.body)
    await salvaCadastro(usuarioCadastro)
    return res.status(201).send()
}
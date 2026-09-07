import type { Request, Response, NextFunction } from 'express';

// Injeta um usuário padrão em todas as requisições para simular o JWT
export function autenticacaoMock(req: Request, _res: Response, next: NextFunction) {
  req.usuario = {
    id: 'id-usuario-padrao-123',
    email: 'dev-teste@projeto.com',
  };
  
  next();
}
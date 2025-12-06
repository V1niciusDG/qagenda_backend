import { Request, Response, NextFunction } from 'express';

const NoAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Middleware que não faz validação de autenticação
  // Usado para rotas públicas
  return next();
};

export { NoAuthenticated };

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@config/AppError';
import auth from '@config/Auth';

interface IPayload {
  sub: string;
  user: {
    id: number;
    email: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

export async function Authenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token not provided', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.secret_token) as IPayload;

    request.user = decoded.user;

    return next();
  } catch (err: any) {
    if (err?.message === 'jwt expired') {
      throw new AppError('Token expired', 401);
    }
    throw new AppError('Invalid token', 401);
  }
}

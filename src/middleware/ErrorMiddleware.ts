import { Request, Response, NextFunction } from 'express';
import { AppError } from '@config/AppError';

export function errorMiddleware(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error('Internal Error:', err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

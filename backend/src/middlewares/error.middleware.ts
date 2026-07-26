import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/customError.util';
import { config } from '../config';

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      status: err.statusCode,
      message: err.message,
      error: err.message,
      code: err.code,
    });
    return;
  }

  // Handle generic unexpected server errors
  console.error('[Unhandled Error]:', err);

  const statusCode = 500;
  const response: {
    success: boolean;
    status: number;
    message: string;
    error: string;
    code: string;
    stack?: string;
  } = {
    success: false,
    status: statusCode,
    message: 'Internal Server Error',
    error: 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR',
  };

  if (config.nodeEnv === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

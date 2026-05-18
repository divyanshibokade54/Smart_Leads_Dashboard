import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Log the error
  logger.error(err.message, { stack: err.stack });

  // Handle known ApiError
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(ApiResponse.error(err.message));
    return;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    res.status(400).json(ApiResponse.error('Validation Error'));
    return;
  }

  // Handle Mongoose duplicate key errors
  if (err.name === 'MongoServerError' && (err as Record<string, unknown>).code === 11000) {
    res.status(409).json(ApiResponse.error('Duplicate entry'));
    return;
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json(ApiResponse.error('Invalid token'));
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json(ApiResponse.error('Token expired'));
    return;
  }

  // Default: Internal Server Error
  const message = env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
  res.status(500).json(ApiResponse.error(message));
};

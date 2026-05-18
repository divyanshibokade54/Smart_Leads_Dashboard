import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiResponse } from '../utils/ApiResponse';

type RequestField = 'body' | 'query' | 'params';

export const validate = (schema: ZodSchema, field: RequestField = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[field]);
      // Replace the field with the parsed & validated data
      (req as Record<string, unknown>)[field] = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));

        res.status(400).json(
          ApiResponse.error('Validation failed', {
            errors: formattedErrors,
          }),
        );
        return;
      }
      next(error);
    }
  };
};

import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { AuthenticatedRequest, UserRole } from '../types';

/**
 * Middleware to authorize specific roles
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest;

    if (!authReq.user) {
      throw ApiError.unauthorized('Not authenticated');
    }

    if (!roles.includes(authReq.user.role)) {
      throw ApiError.forbidden(
        `Role '${authReq.user.role}' is not authorized to access this resource`,
      );
    }

    next();
  };
};

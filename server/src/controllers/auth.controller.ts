import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import { AuthenticatedRequest } from '../types';

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body as RegisterInput;
  const { user, token } = await authService.register(data);

  res.status(201).json(
    ApiResponse.success(
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      },
      'User registered successfully',
    ),
  );
});

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user & return JWT
 * @access  Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body as LoginInput;
  const { user, token } = await authService.login(data);

  res.status(200).json(
    ApiResponse.success(
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      },
      'Login successful',
    ),
  );
});

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current logged-in user
 * @access  Private
 */
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  const userId = authReq.user?.userId;

  if (!userId) {
    res.status(401).json(ApiResponse.error('Not authenticated'));
    return;
  }

  const user = await authService.getUserById(userId);

  res.status(200).json(
    ApiResponse.success(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      'User profile fetched',
    ),
  );
});

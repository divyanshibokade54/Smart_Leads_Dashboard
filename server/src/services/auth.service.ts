import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { User, IUser } from '../models/User';
import { ApiError } from '../utils/ApiError';
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import { JwtPayload } from '../types';

class AuthService {
  /**
   * Generate a JWT token for a user
   */
  generateToken(user: IUser): string {
    const payload: JwtPayload = {
      userId: user._id.toString(),
      role: user.role,
    };

    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
  }

  /**
   * Register a new user
   */
  async register(data: RegisterInput): Promise<{ user: IUser; token: string }> {
    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw ApiError.conflict('User with this email already exists');
    }

    // Create user (password will be hashed by pre-save hook)
    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash: data.password,
      role: data.role || 'sales',
    });

    const token = this.generateToken(user);

    return { user, token };
  }

  /**
   * Login a user
   */
  async login(data: LoginInput): Promise<{ user: IUser; token: string }> {
    // Find user and explicitly select passwordHash
    const user = await User.findOne({ email: data.email }).select('+passwordHash');
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Compare passwords
    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const token = this.generateToken(user);

    return { user, token };
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }
}

export const authService = new AuthService();

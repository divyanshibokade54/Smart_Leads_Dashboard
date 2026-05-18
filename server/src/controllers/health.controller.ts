import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import mongoose from 'mongoose';

export const healthCheck = (_req: Request, res: Response): void => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    version: '1.0.0',
  };

  res.status(200).json(ApiResponse.success(healthData, 'Server is running'));
};

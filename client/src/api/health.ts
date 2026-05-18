import apiClient from './client';
import type { ApiResponse } from '../types';

interface HealthData {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  mongodb: string;
  version: string;
}

export const checkHealth = async (): Promise<ApiResponse<HealthData>> => {
  const { data } = await apiClient.get<ApiResponse<HealthData>>('/health');
  return data;
};

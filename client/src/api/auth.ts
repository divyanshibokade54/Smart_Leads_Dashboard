import apiClient from './client';
import type { ApiResponse, AuthResponse, LoginPayload, RegisterPayload } from '../types';

export const authApi = {
  register: async (data: RegisterPayload): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginPayload): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data;
  },

  getMe: async (): Promise<ApiResponse<AuthResponse['user']>> => {
    const response = await apiClient.get<ApiResponse<AuthResponse['user']>>('/auth/me');
    return response.data;
  },
};

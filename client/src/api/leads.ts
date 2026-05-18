import apiClient from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  Lead,
  CreateLeadPayload,
  UpdateLeadPayload,
  PaginationParams,
} from '../types';

export const leadsApi = {
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Lead>> => {
    const response = await apiClient.get<PaginatedResponse<Lead>>('/leads', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Lead>> => {
    const response = await apiClient.get<ApiResponse<Lead>>(`/leads/${id}`);
    return response.data;
  },

  create: async (data: CreateLeadPayload): Promise<ApiResponse<Lead>> => {
    const response = await apiClient.post<ApiResponse<Lead>>('/leads', data);
    return response.data;
  },

  update: async (id: string, data: UpdateLeadPayload): Promise<ApiResponse<Lead>> => {
    const response = await apiClient.put<ApiResponse<Lead>>(`/leads/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/leads/${id}`);
    return response.data;
  },

  exportCsv: async (): Promise<Blob> => {
    const response = await apiClient.get('/leads/export/csv', {
      responseType: 'blob',
    });
    return response.data as Blob;
  },
};

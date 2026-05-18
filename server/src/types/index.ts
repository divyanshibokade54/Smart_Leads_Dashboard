import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  role: 'admin' | 'sales';
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export type UserRole = 'admin' | 'sales';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';

export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface PaginationQuery {
  page?: string;
  limit?: string;
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

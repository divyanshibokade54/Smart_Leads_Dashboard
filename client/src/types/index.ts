// ═══════════════════════════════════════
// Shared TypeScript Interfaces
// ═══════════════════════════════════════

// ─── User ───────────────────────────────
export type UserRole = 'admin' | 'sales';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// ─── Lead ───────────────────────────────
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  ownerId: string | User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface UpdateLeadPayload extends Partial<CreateLeadPayload> {}

// ─── Auth ───────────────────────────────
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ─── API Response ───────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: Record<string, unknown>;
}

// ─── Pagination ─────────────────────────
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

import { Lead, ILead } from '../models/Lead';
import { ApiError } from '../utils/ApiError';
import { CreateLeadInput, UpdateLeadInput, LeadQueryInput } from '../validators/lead.validator';
import { PaginationMeta } from '../types';
import { FilterQuery, SortOrder } from 'mongoose';

interface LeadListResult {
  leads: ILead[];
  meta: PaginationMeta;
}

class LeadService {
  /**
   * Create a new lead
   */
  async create(data: CreateLeadInput, ownerId: string): Promise<ILead> {
    const lead = await Lead.create({
      ...data,
      ownerId,
    });
    return lead.populate('ownerId', 'name email role');
  }

  /**
   * Get paginated leads with filters
   */
  async getAll(
    query: LeadQueryInput,
    userId: string,
    userRole: string,
  ): Promise<LeadListResult> {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10', 10)));
    const skip = (page - 1) * limit;

    // Build filter
    const filter: FilterQuery<ILead> = {};

    // RBAC: Sales users can only see their own leads
    if (userRole === 'sales') {
      filter.ownerId = userId;
    }

    // Status filter
    if (query.status) {
      filter.status = query.status;
    }

    // Source filter
    if (query.source) {
      filter.source = query.source;
    }

    // Search filter (name or email)
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
      ];
    }

    // Build sort
    const sortField = query.sortBy || 'createdAt';
    const sortOrder: SortOrder = query.sortOrder === 'asc' ? 1 : -1;

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate('ownerId', 'name email role')
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(filter),
    ]);

    return {
      leads: leads as ILead[],
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a single lead by ID
   */
  async getById(leadId: string, userId: string, userRole: string): Promise<ILead> {
    const lead = await Lead.findById(leadId).populate('ownerId', 'name email role');

    if (!lead) {
      throw ApiError.notFound('Lead not found');
    }

    // RBAC: Sales users can only access their own leads
    if (userRole === 'sales' && lead.ownerId.toString() !== userId) {
      throw ApiError.forbidden('You can only access your own leads');
    }

    return lead;
  }

  /**
   * Update a lead
   */
  async update(
    leadId: string,
    data: UpdateLeadInput,
    userId: string,
    userRole: string,
  ): Promise<ILead> {
    const lead = await Lead.findById(leadId);

    if (!lead) {
      throw ApiError.notFound('Lead not found');
    }

    // RBAC: Sales users can only update their own leads
    if (userRole === 'sales' && lead.ownerId.toString() !== userId) {
      throw ApiError.forbidden('You can only update your own leads');
    }

    const updatedLead = await Lead.findByIdAndUpdate(leadId, data, {
      new: true,
      runValidators: true,
    }).populate('ownerId', 'name email role');

    if (!updatedLead) {
      throw ApiError.notFound('Lead not found');
    }

    return updatedLead;
  }

  /**
   * Delete a lead
   */
  async delete(leadId: string, userId: string, userRole: string): Promise<void> {
    const lead = await Lead.findById(leadId);

    if (!lead) {
      throw ApiError.notFound('Lead not found');
    }

    // RBAC: Sales users can only delete their own leads
    if (userRole === 'sales' && lead.ownerId.toString() !== userId) {
      throw ApiError.forbidden('You can only delete your own leads');
    }

    await Lead.findByIdAndDelete(leadId);
  }

  /**
   * Get all leads for CSV export (no pagination)
   */
  async getAllForExport(userId: string, userRole: string): Promise<ILead[]> {
    const filter: FilterQuery<ILead> = {};

    if (userRole === 'sales') {
      filter.ownerId = userId;
    }

    return Lead.find(filter)
      .populate('ownerId', 'name email role')
      .sort({ createdAt: -1 })
      .lean() as Promise<ILead[]>;
  }
}

export const leadService = new LeadService();

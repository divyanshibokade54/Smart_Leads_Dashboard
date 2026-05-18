import { Request, Response } from 'express';
import { leadService } from '../services/lead.service';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../types';
import { CreateLeadInput, UpdateLeadInput, LeadQueryInput } from '../validators/lead.validator';

/**
 * @route   POST /api/v1/leads
 * @desc    Create a new lead
 * @access  Private
 */
export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  const data = req.body as CreateLeadInput;

  const lead = await leadService.create(data, authReq.user!.userId);

  res.status(201).json(ApiResponse.success(lead, 'Lead created successfully'));
});

/**
 * @route   GET /api/v1/leads
 * @desc    Get all leads (paginated, filtered)
 * @access  Private
 */
export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  const query = req.query as unknown as LeadQueryInput;

  const { leads, meta } = await leadService.getAll(
    query,
    authReq.user!.userId,
    authReq.user!.role,
  );

  res.status(200).json({
    success: true,
    message: 'Leads fetched successfully',
    data: leads,
    meta,
  });
});

/**
 * @route   GET /api/v1/leads/:id
 * @desc    Get a single lead
 * @access  Private
 */
export const getLead = asyncHandler(async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  const lead = await leadService.getById(
    req.params.id,
    authReq.user!.userId,
    authReq.user!.role,
  );

  res.status(200).json(ApiResponse.success(lead, 'Lead fetched successfully'));
});

/**
 * @route   PUT /api/v1/leads/:id
 * @desc    Update a lead
 * @access  Private
 */
export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  const data = req.body as UpdateLeadInput;

  const lead = await leadService.update(
    req.params.id,
    data,
    authReq.user!.userId,
    authReq.user!.role,
  );

  res.status(200).json(ApiResponse.success(lead, 'Lead updated successfully'));
});

/**
 * @route   DELETE /api/v1/leads/:id
 * @desc    Delete a lead
 * @access  Private
 */
export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;

  await leadService.delete(req.params.id, authReq.user!.userId, authReq.user!.role);

  res.status(200).json(ApiResponse.success(null, 'Lead deleted successfully'));
});

/**
 * @route   GET /api/v1/leads/export/csv
 * @desc    Export leads as CSV
 * @access  Private
 */
export const exportLeads = asyncHandler(async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;

  const leads = await leadService.getAllForExport(authReq.user!.userId, authReq.user!.role);

  // Build CSV
  const headers = ['Name', 'Email', 'Status', 'Source', 'Created At'];
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    new Date(lead.createdAt).toISOString(),
  ]);

  const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=leads-export.csv');
  res.status(200).send(csv);
});

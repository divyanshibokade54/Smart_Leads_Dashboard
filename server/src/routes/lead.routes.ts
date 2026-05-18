import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  exportLeads,
} from '../controllers/lead.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createLeadSchema, updateLeadSchema, leadQuerySchema } from '../validators/lead.validator';

const router = Router();

// All lead routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/leads/export/csv
 * @desc    Export leads as CSV (must be BEFORE /:id)
 * @access  Private
 */
router.get('/export/csv', exportLeads);

/**
 * @route   GET /api/v1/leads
 * @desc    Get all leads (paginated)
 * @access  Private
 */
router.get('/', validate(leadQuerySchema, 'query'), getLeads);

/**
 * @route   POST /api/v1/leads
 * @desc    Create a lead
 * @access  Private
 */
router.post('/', validate(createLeadSchema), createLead);

/**
 * @route   GET /api/v1/leads/:id
 * @desc    Get single lead
 * @access  Private
 */
router.get('/:id', getLead);

/**
 * @route   PUT /api/v1/leads/:id
 * @desc    Update a lead
 * @access  Private
 */
router.put('/:id', validate(updateLeadSchema), updateLead);

/**
 * @route   DELETE /api/v1/leads/:id
 * @desc    Delete a lead
 * @access  Private
 */
router.delete('/:id', deleteLead);

export default router;

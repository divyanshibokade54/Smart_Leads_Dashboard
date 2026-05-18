import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  Search,
  Download,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Users,
  Inbox,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { leadsApi } from '../../api/leads';
import { useDebounce } from '../../hooks/useDebounce';
import { Button } from '../../components/Button';
import { LeadFormModal } from './LeadFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { cn, formatDate } from '../../utils/helpers';
import type { Lead, LeadStatus, LeadSource, CreateLeadPayload, UpdateLeadPayload } from '../../types';

const statusColors: Record<LeadStatus, string> = {
  New: 'badge-new',
  Contacted: 'badge-contacted',
  Qualified: 'badge-qualified',
  Lost: 'badge-lost',
};

export function LeadsPage() {
  const queryClient = useQueryClient();

  // ─── State ────────────────────────────
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | ''>('');
  const [sourceFilter, setSourceFilter] = useState<LeadSource | ''>('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);

  const debouncedSearch = useDebounce(search, 400);

  // ─── Query ────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: ['leads', page, debouncedSearch, statusFilter, sourceFilter],
    queryFn: () =>
      leadsApi.getAll({
        page,
        limit: 10,
        search: debouncedSearch || undefined,
        status: statusFilter || undefined,
        source: sourceFilter || undefined,
      }),
  });

  const leads = data?.data || [];
  const meta = data?.meta;

  // ─── Mutations ────────────────────────
  const createMutation = useMutation({
    mutationFn: (data: CreateLeadPayload) => leadsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created successfully');
    },
    onError: () => toast.error('Failed to create lead'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadPayload }) =>
      leadsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated successfully');
    },
    onError: () => toast.error('Failed to update lead'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => leadsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead deleted successfully');
    },
    onError: () => toast.error('Failed to delete lead'),
  });

  // ─── Handlers ─────────────────────────
  const handleCreate = useCallback(
    async (data: CreateLeadPayload) => {
      await createMutation.mutateAsync(data);
    },
    [createMutation],
  );

  const handleUpdate = useCallback(
    async (data: UpdateLeadPayload) => {
      if (!editLead) return;
      await updateMutation.mutateAsync({ id: editLead._id, data });
      setEditLead(null);
    },
    [editLead, updateMutation],
  );

  const handleDelete = useCallback(async () => {
    if (!deleteLead) return;
    await deleteMutation.mutateAsync(deleteLead._id);
    setDeleteLead(null);
  }, [deleteLead, deleteMutation]);

  const handleExport = useCallback(async () => {
    try {
      const blob = await leadsApi.exportCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('CSV exported successfully');
    } catch {
      toast.error('Failed to export CSV');
    }
  }, []);

  // ─── Loading Skeleton ─────────────────
  const renderSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-surface-50 dark:bg-surface-800/30">
          <div className="w-40 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
          <div className="w-48 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
          <div className="w-20 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
          <div className="w-24 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
          <div className="w-32 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ─── Header ──────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Leads</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Manage and track your leads
            {meta && <span className="ml-1">· {meta.total} total</span>}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button size="sm" onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4" />
            New Lead
          </Button>
        </div>
      </div>

      {/* ─── Filters Bar ─────────────────── */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-surface-400 flex-shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as LeadStatus | ''); setPage(1); }}
              className="px-3 py-2.5 rounded-xl text-sm bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => { setSourceFilter(e.target.value as LeadSource | ''); setPage(1); }}
              className="px-3 py-2.5 rounded-xl text-sm bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
            >
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="Referral">Referral</option>
            </select>
          </div>
        </div>
      </div>

      {/* ─── Table ───────────────────────── */}
      <div className="glass-card overflow-hidden">
        {isLoading ? (
          <div className="p-4">{renderSkeleton()}</div>
        ) : isError ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-surface-900 dark:text-white font-medium">Failed to load leads</p>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
              Please check your connection and try again
            </p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-6 h-6 text-surface-400" />
            </div>
            <p className="text-surface-900 dark:text-white font-medium">No leads found</p>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1 mb-4">
              {search || statusFilter || sourceFilter
                ? 'Try adjusting your filters'
                : 'Get started by creating your first lead'}
            </p>
            {!search && !statusFilter && !sourceFilter && (
              <Button size="sm" onClick={() => setIsCreateOpen(true)}>
                <Plus className="w-4 h-4" />
                Create Lead
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-200/50 dark:border-surface-700/50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-surface-800/50">
                  {leads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-surface-900 dark:text-white">
                          {lead.name}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {lead.email}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={cn('badge', statusColors[lead.status])}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {lead.source}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-surface-500 dark:text-surface-400">
                          {formatDate(lead.createdAt)}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setEditLead(lead)}
                            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteLead(lead)}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-surface-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-surface-100 dark:divide-surface-800/50">
              {leads.map((lead) => (
                <div key={lead._id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {lead.name}
                    </p>
                    <span className={cn('badge', statusColors[lead.status])}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-surface-500 dark:text-surface-400">{lead.email}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-surface-400">{lead.source} · {formatDate(lead.createdAt)}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditLead(lead)}
                        className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteLead(lead)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-surface-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ─── Pagination ──────────────────── */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-surface-200/50 dark:border-surface-700/50">
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Page {meta.page} of {meta.totalPages} · {meta.total} results
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={meta.page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (meta.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (meta.page <= 3) {
                    pageNum = i + 1;
                  } else if (meta.page >= meta.totalPages - 2) {
                    pageNum = meta.totalPages - 4 + i;
                  } else {
                    pageNum = meta.page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={cn(
                        'w-8 h-8 rounded-lg text-xs font-medium transition-all',
                        pageNum === meta.page
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                          : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800',
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={meta.page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ─── Modals ──────────────────────── */}
      <LeadFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
      />

      {editLead && (
        <LeadFormModal
          isOpen={!!editLead}
          onClose={() => setEditLead(null)}
          onSubmit={handleUpdate}
          lead={editLead}
          isLoading={updateMutation.isPending}
        />
      )}

      {deleteLead && (
        <DeleteConfirmModal
          isOpen={!!deleteLead}
          onClose={() => setDeleteLead(null)}
          onConfirm={handleDelete}
          leadName={deleteLead.name}
          isLoading={deleteMutation.isPending}
        />
      )}
    </div>
  );
}

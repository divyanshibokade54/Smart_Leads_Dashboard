import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../store';
import { leadsApi } from '../api/leads';
import { BarChart3, Users, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { cn, formatDate } from '../utils/helpers';
import type { LeadStatus } from '../types';

const statusColors: Record<LeadStatus, string> = {
  New: 'badge-new',
  Contacted: 'badge-contacted',
  Qualified: 'badge-qualified',
  Lost: 'badge-lost',
};

export function DashboardPage() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['leads', 1, '', '', ''],
    queryFn: () => leadsApi.getAll({ page: 1, limit: 5 }),
  });

  const leads = data?.data || [];
  const total = data?.meta?.total || 0;

  // Compute stats from available data
  const newCount = leads.filter((l) => l.status === 'New').length;
  const qualifiedCount = leads.filter((l) => l.status === 'Qualified').length;
  const contactedCount = leads.filter((l) => l.status === 'Contacted').length;

  const stats = [
    { label: 'Total Leads', value: total.toString(), icon: Users, color: 'from-primary-500 to-blue-600', shadowColor: 'shadow-primary-500/20' },
    { label: 'Qualified', value: qualifiedCount.toString(), icon: TrendingUp, color: 'from-emerald-500 to-teal-600', shadowColor: 'shadow-emerald-500/20' },
    { label: 'Contacted', value: contactedCount.toString(), icon: BarChart3, color: 'from-amber-500 to-orange-600', shadowColor: 'shadow-amber-500/20' },
    { label: 'New', value: newCount.toString(), icon: Clock, color: 'from-violet-500 to-purple-600', shadowColor: 'shadow-violet-500/20' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
          Welcome back, <span className="gradient-text">{user?.name || 'User'}</span>
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          Here&apos;s your leads overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-5 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-surface-500 dark:text-surface-400">
                {stat.label}
              </span>
              <div
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg ${stat.shadowColor}`}
              >
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            {isLoading ? (
              <div className="w-16 h-8 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
            ) : (
              <p className="text-3xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200/50 dark:border-surface-700/50">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Recent Leads</h3>
          <Link to="/leads">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-3">
                <div className="w-32 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
                <div className="w-48 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
                <div className="w-20 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
              </div>
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-10 h-10 text-surface-300 dark:text-surface-600 mx-auto mb-3" />
            <p className="text-sm text-surface-500 dark:text-surface-400">No leads yet</p>
            <Link to="/leads" className="mt-3 inline-block">
              <Button size="sm">Create your first lead</Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
            {leads.map((lead) => (
              <div key={lead._id} className="flex items-center justify-between px-5 py-3 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{lead.name}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400 truncate">{lead.email}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className={cn('badge', statusColors[lead.status])}>{lead.status}</span>
                  <span className="text-xs text-surface-400 hidden sm:block">{formatDate(lead.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

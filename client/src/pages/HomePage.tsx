import { useQuery } from '@tanstack/react-query';
import { checkHealth } from '../api/health';
import {
  Activity,
  Server,
  Database,
  Clock,
  CheckCircle2,
  XCircle,
  Zap,
  BarChart3,
  Users,
  TrendingUp,
} from 'lucide-react';

export function HomePage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['health'],
    queryFn: checkHealth,
    retry: 2,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-surface-100 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950">
      {/* ─── Header ─────────────────────────────── */}
      <header className="border-b border-surface-200/60 dark:border-surface-800/60 bg-white/60 dark:bg-surface-900/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-surface-900 dark:text-white">
                  Smart Leads
                </h1>
                <p className="text-xs text-surface-500 dark:text-surface-400">Dashboard v1.0.0</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {data?.data?.status === 'healthy' ? (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
                  System Online
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  {isLoading ? 'Connecting...' : 'Offline'}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main Content ────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            feat/01-project-setup complete
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-surface-900 dark:text-white mb-4">
            Welcome to <span className="gradient-text">Smart Leads</span>
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Your production-grade lead management dashboard. Built with React, TypeScript,
            TailwindCSS, Express, and MongoDB.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Users,
              title: 'Role-Based Access',
              desc: 'Admin & Sales roles with granular permissions',
              color: 'from-violet-500 to-purple-600',
              shadowColor: 'shadow-violet-500/20',
            },
            {
              icon: BarChart3,
              title: 'Lead Management',
              desc: 'Full CRUD with filtering, search & pagination',
              color: 'from-primary-500 to-blue-600',
              shadowColor: 'shadow-primary-500/20',
            },
            {
              icon: TrendingUp,
              title: 'CSV Export',
              desc: 'Export leads data with one click',
              color: 'from-emerald-500 to-teal-600',
              shadowColor: 'shadow-emerald-500/20',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-6 hover:scale-[1.02] transition-all duration-300 animate-slide-up"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg ${feature.shadowColor}`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-surface-600 dark:text-surface-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Health Check Card */}
        <div className="glass-card p-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                Server Health Check
              </h3>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                GET /api/v1/health
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
                  <div className="w-48 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse-soft" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-400">
                  Server is not reachable
                </p>
                <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                  {error instanceof Error ? error.message : 'Connection failed'}. Make sure the
                  server is running on port 5000.
                </p>
              </div>
            </div>
          )}

          {data?.data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: CheckCircle2,
                  label: 'Status',
                  value: data.data.status,
                  color: 'text-emerald-600 dark:text-emerald-400',
                },
                {
                  icon: Database,
                  label: 'MongoDB',
                  value: data.data.mongodb,
                  color:
                    data.data.mongodb === 'connected'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-red-600 dark:text-red-400',
                },
                {
                  icon: Clock,
                  label: 'Uptime',
                  value: `${Math.floor(data.data.uptime)}s`,
                  color: 'text-primary-600 dark:text-primary-400',
                },
                {
                  icon: Activity,
                  label: 'Environment',
                  value: data.data.environment,
                  color: 'text-amber-600 dark:text-amber-400',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-4 rounded-lg bg-surface-50 dark:bg-surface-800/50 border border-surface-200/50 dark:border-surface-700/50"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{item.label}</p>
                    <p className="text-sm font-semibold text-surface-900 dark:text-white capitalize">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mt-12 text-center">
          <p className="text-sm text-surface-400 dark:text-surface-500 mb-4">Built with</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Express', 'MongoDB', 'Docker'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-xs font-medium border border-surface-200/50 dark:border-surface-700/50"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

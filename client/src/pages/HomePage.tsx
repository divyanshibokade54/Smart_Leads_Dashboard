import { Link } from 'react-router-dom';
import { useAuth } from '../store';
import {
  Zap,
  BarChart3,
  Users,
  Shield,
  Download,
  Search,
  ArrowRight,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Globe,
  Lock,
} from 'lucide-react';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Users,
      title: 'Lead Management',
      description: 'Full CRUD operations with intuitive interface. Create, edit, and track leads effortlessly.',
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Shield,
      title: 'Role-Based Access',
      description: 'Admin & Sales roles with granular permissions. Secure your data with RBAC.',
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10',
    },
    {
      icon: Search,
      title: 'Smart Search & Filter',
      description: 'Debounced search with status and source filters. Find any lead instantly.',
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-500/10',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time stats and insights. Track your lead pipeline at a glance.',
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-green-500/10',
    },
    {
      icon: Download,
      title: 'CSV Export',
      description: 'Export your leads data with one click. Compatible with Excel and Google Sheets.',
      gradient: 'from-rose-500 to-red-500',
      bg: 'bg-rose-500/10',
    },
    {
      icon: Globe,
      title: 'Dark Mode',
      description: 'Beautiful dark and light themes. Easy on the eyes, day or night.',
      gradient: 'from-indigo-500 to-violet-500',
      bg: 'bg-indigo-500/10',
    },
  ];

  const stats = [
    { value: '10x', label: 'Faster Lead Tracking' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '2', label: 'User Roles (Admin/Sales)' },
    { value: '∞', label: 'Leads Capacity' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* ─── Ambient Background ─────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[150px]" />
      </div>

      {/* ─── Navigation ──────────────────────────────────── */}
      <nav className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight">SmartLeads</span>
                <span className="text-xs text-gray-500 ml-2 hidden sm:inline">Dashboard</span>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-gray-300 hover:text-white font-medium text-sm transition-colors duration-200 rounded-xl hover:bg-white/5"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ────────────────────────────────── */}
      <section className="relative z-10 pt-20 sm:pt-28 lg:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Production-Grade MERN Stack Application
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            <span className="text-white">Manage Your Leads</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A powerful lead management dashboard with role-based access, real-time analytics, 
            smart search, and CSV export. Built with React, TypeScript, and MongoDB.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-base hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1"
              >
                Open Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-base hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 w-full sm:w-auto justify-center"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-base hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto justify-center backdrop-blur-sm"
                >
                  <Lock className="w-4 h-4" />
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ────────────────────────────── */}
      <section className="relative z-10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6">
              <TrendingUp className="w-3.5 h-3.5" />
              Powerful Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Convert Leads
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              From lead capture to conversion tracking — all the tools your team needs in one dashboard.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 bg-gradient-to-r ${feature.gradient} bg-clip-text`} style={{ color: feature.gradient.includes('blue') ? '#3b82f6' : feature.gradient.includes('purple') ? '#a855f7' : feature.gradient.includes('amber') ? '#f59e0b' : feature.gradient.includes('green') ? '#22c55e' : feature.gradient.includes('rose') ? '#f43f5e' : '#6366f1' }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─────────────────────────────────── */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-3xl p-8 sm:p-12 text-center overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                Ready to Supercharge Your
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Lead Pipeline?
                </span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto mb-8">
                Join now and start managing leads like a pro. Free to use, no credit card required.
              </p>
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-base hover:bg-gray-100 transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  Go to Dashboard
                  <ChevronRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-base hover:bg-gray-100 transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  Get Started for Free
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-400">SmartLeads Dashboard</span>
            </div>
            <p className="text-xs text-gray-600">
              Built with React · TypeScript · TailwindCSS · Express · MongoDB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

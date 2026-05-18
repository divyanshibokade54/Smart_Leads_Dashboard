import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store';
import { useDarkMode } from '../hooks/useDarkMode';
import {
  Zap,
  LayoutDashboard,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react';
import { cn, getInitials } from '../utils/helpers';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Leads', path: '/leads', icon: Users },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, toggleDark] = useDarkMode();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* ─── Top Navbar ──────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-surface-200/60 dark:border-surface-800/60 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-surface-900 dark:text-white hidden sm:block">
                Smart Leads
              </span>
            </Link>
          </div>

          {/* Right: Dark Mode Toggle + Profile */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-all duration-300"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold">
                  {getInitials(user?.name || 'U')}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-surface-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-surface-500 dark:text-surface-400 capitalize">
                    {user?.role}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-surface-400 hidden sm:block" />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 glass-card p-2 z-50 animate-slide-down">
                    <div className="px-3 py-2 border-b border-surface-200/50 dark:border-surface-700/50 mb-1">
                      <p className="text-sm font-medium text-surface-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* ─── Sidebar ───────────────────────── */}
        <aside
          className={cn(
            'fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 border-r border-surface-200/60 dark:border-surface-800/60',
            'bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl',
            'transition-transform duration-300 lg:translate-x-0',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 shadow-sm'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800',
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Role Badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="px-3 py-2 rounded-xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200/50 dark:border-surface-700/50">
              <p className="text-xs text-surface-500 dark:text-surface-400">Signed in as</p>
              <p className="text-sm font-medium text-surface-900 dark:text-white capitalize">
                {user?.role} Account
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ─── Main Content ──────────────────── */}
        <main className="flex-1 p-4 lg:p-8 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}

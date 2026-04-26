import React, { useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { LayoutDashboard, Mail, Users, LogOut, Moon, Sun, Menu, X } from 'lucide-react';
import { BRANDING } from '../data/branding';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';
import EnquiryTable from './EnquiryTable';
import { useAdmin } from './useAdmin';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/admin/enquiries', label: 'Enquiries', icon: Mail },
  { path: '/admin/trainers', label: 'Trainers', icon: Users },
];

/**
 * AdminLayout — Standalone layout for the admin dashboard.
 * Does NOT use the public Layout component. Has its own header + sidebar.
 */
const AdminLayout = () => {
  const { isAuthenticated, login, logout, fetchEnquiries, fetchStats, updateStatus } = useAdmin();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoSrc = theme === 'dark' ? BRANDING.logoLight : BRANDING.logoDark;

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-body)] flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
          <img src={logoSrc} alt={BRANDING.fullName} className="h-8 object-contain" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ path, label, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-small font-medium transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-body)]'
                )
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[var(--border-color)] space-y-2">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-small font-medium text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-body)] transition-all w-full"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-small font-medium text-red-500 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar (mobile) */}
        <header className="sticky top-0 z-30 bg-[var(--bg-card)] border-b border-[var(--border-color)] px-4 py-3 flex items-center justify-between lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-body)] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-small font-bold text-[var(--text-heading)]">Admin Panel</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-caption text-[var(--text-muted)] hidden sm:inline">
              {BRANDING.fullName}
            </span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-caption font-bold text-primary">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Routes>
            <Route
              index
              element={
                <Dashboard
                  fetchStats={fetchStats}
                  fetchEnquiries={fetchEnquiries}
                />
              }
            />
            <Route
              path="enquiries"
              element={
                <EnquiryTable
                  fetchEnquiries={fetchEnquiries}
                  updateStatus={updateStatus}
                />
              }
            />
            <Route
              path="trainers"
              element={
                <EnquiryTable
                  fetchEnquiries={fetchEnquiries}
                  updateStatus={updateStatus}
                  isTrainerView
                />
              }
            />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

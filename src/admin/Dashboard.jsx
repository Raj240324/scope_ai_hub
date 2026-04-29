import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, CalendarClock, UserCheck, Users, Mail, ArrowRight, TrendingUp, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

const StatCard = ({ icon: Icon, label, value, color, subtitle }) => (
  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 flex items-start gap-4">
    <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', color)}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="min-w-0">
      <p className="text-caption text-[var(--text-muted)] font-medium">{label}</p>
      <p className="heading-sm text-[var(--text-heading)] mt-0.5">{value}</p>
      {subtitle && <p className="text-caption text-[var(--text-muted)] mt-1">{subtitle}</p>}
    </div>
  </div>
);

const RecentRow = ({ enquiry }) => (
  <div className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-b-0">
    <div className="min-w-0 flex-1">
      <p className="text-small font-semibold text-[var(--text-heading)] truncate">{enquiry.name}</p>
      <p className="text-caption text-[var(--text-muted)] truncate">{enquiry.email}</p>
    </div>
    <div className="hidden sm:block text-right ml-4">
      <p className="text-caption text-primary font-medium truncate max-w-[200px]">{enquiry.course}</p>
      <p className="text-caption text-[var(--text-muted)]">
        {new Date(enquiry.created_at).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </p>
    </div>
  </div>
);

const Dashboard = ({ fetchStats, fetchEnquiries }) => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const [statsRes, enquiriesRes] = await Promise.allSettled([
        fetchStats(),
        fetchEnquiries({ limit: 5, sort: 'desc' }),
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value.success) {
        setStats(statsRes.value.stats);
      }

      if (enquiriesRes.status === 'fulfilled' && enquiriesRes.value.success) {
        setRecent(enquiriesRes.value.data);
      }

      // Check for session expiry
      const sessionExpired = [statsRes, enquiriesRes].some(
        (r) => r.status === 'rejected' && r.reason?.message === 'SESSION_EXPIRED'
      );
      if (sessionExpired) {
        window.location.reload();
        return;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchStats, fetchEnquiries]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-body text-red-500">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-secondary mt-4 px-6 py-2 rounded-xl text-small">
          Retry
        </button>
      </div>
    );
  }

  const enquiryStats = stats?.enquiries || {};
  const statusCounts = enquiryStats.byStatus || { new: 0, contacted: 0, converted: 0 };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="heading-md text-[var(--text-heading)]">Dashboard</h1>
          <p className="text-body text-[var(--text-muted)] mt-1">Overview of enquiries and applications.</p>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-small font-medium text-[var(--text-body)] hover:text-primary hover:border-primary/30 transition-all disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Inbox}
          label="Total Enquiries"
          value={enquiryStats.total || 0}
          color="bg-primary/10 text-primary"
          subtitle={`${enquiryStats.today || 0} today`}
        />
        <StatCard
          icon={CalendarClock}
          label="New / Pending"
          value={statusCounts.new}
          color="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          icon={UserCheck}
          label="Converted"
          value={statusCounts.converted}
          color="bg-emerald-500/10 text-emerald-500"
        />
        <StatCard
          icon={Users}
          label="Trainer Applications"
          value={stats?.trainers?.total || 0}
          color="bg-amber-500/10 text-amber-500"
        />
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading-sm text-[var(--text-heading)]">Recent Enquiries</h2>
            <Link
              to="/admin/enquiries"
              className="text-caption font-semibold text-primary hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="text-center py-8">
              <Inbox className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2 opacity-50" />
              <p className="text-small text-[var(--text-muted)]">No enquiries yet. Your leads will appear here.</p>
            </div>
          ) : (
            <div className="divide-y-0">
              {recent.map((item) => (
                <RecentRow key={item.id} enquiry={item} />
              ))}
            </div>
          )}
        </div>

        {/* Course Breakdown */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
          <h2 className="heading-sm text-[var(--text-heading)] mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Top Courses
          </h2>
          {(enquiryStats.byCourse || []).length === 0 ? (
            <p className="text-small text-[var(--text-muted)] text-center py-8">No data available.</p>
          ) : (
            <div className="space-y-3">
              {(enquiryStats.byCourse || []).map(({ course, count }) => (
                <div key={course}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-caption font-medium text-[var(--text-body)] truncate max-w-[180px]">
                      {course}
                    </span>
                    <span className="text-caption font-bold text-primary">{count}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--bg-body)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-[var(--color-accent)]"
                      style={{
                        width: `${Math.min(100, (count / (enquiryStats.total || 1)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Brevo Sync */}
          <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
            <div className="flex items-center justify-between">
              <span className="text-caption text-[var(--text-muted)] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Brevo Synced
              </span>
              <span className="text-caption font-bold text-emerald-500">
                {enquiryStats.brevoSynced || 0} / {enquiryStats.total || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'converted', label: 'Converted' },
];

const Filters = ({ search, onSearchChange, course, onCourseChange, status, onStatusChange, courseOptions = [], onReset }) => {
  const hasActiveFilters = search || course || status;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-body)] border border-[var(--border-color)] text-[var(--text-body)] text-small placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>

        {/* Course Filter */}
        <select
          value={course}
          onChange={(e) => onCourseChange(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-[var(--bg-body)] border border-[var(--border-color)] text-[var(--text-body)] text-small focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer min-w-[160px]"
        >
          <option value="">All Courses</option>
          {courseOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-[var(--bg-body)] border border-[var(--border-color)] text-[var(--text-body)] text-small focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer min-w-[140px]"
        >
          {statusOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-small font-medium text-red-500 hover:bg-red-500/10 border border-red-500/20 transition-all shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;

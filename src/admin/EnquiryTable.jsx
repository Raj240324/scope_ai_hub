import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  UserCheck,
  AlertCircle,
  Mail,
  MailCheck,
  MailX,
  Loader2,
  RefreshCw,
  Inbox,
} from "lucide-react";
import { cn } from "../lib/utils";
import Filters from "./Filters";
import Pagination from "./Pagination";

const STATUS_CONFIG = {
  new: {
    label: "New",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: Clock,
  },
  contacted: {
    label: "Contacted",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: Mail,
  },
  converted: {
    label: "Converted",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: UserCheck,
  },
};

const StatusBadge = ({ status, onStatusChange, enquiryId, isUpdating }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentStatus = (status || "new").toLowerCase();
  const config = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.new;
  const Icon = config.icon;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        disabled={isUpdating}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-caption font-medium transition-all cursor-pointer",
          config.color,
        )}
      >
        {isUpdating ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <Icon className="w-3 h-3" />
        )}
        {config.label}
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && !isUpdating && (
        <div className="absolute top-full left-0 mt-1 w-36 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-xl z-20 overflow-hidden">
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
            const StatusIcon = cfg.icon;
            return (
              <button
                key={key}
                onClick={() => {
                  if (key !== currentStatus) {
                    onStatusChange(enquiryId, key);
                  }
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-caption font-medium transition-colors",
                  key === currentStatus
                    ? "bg-primary/5 text-primary"
                    : "text-[var(--text-body)] hover:bg-[var(--bg-body)]",
                )}
              >
                <StatusIcon className="w-3 h-3" />
                {cfg.label}
                {key === currentStatus && (
                  <CheckCircle className="w-3 h-3 ml-auto" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ExpandedRow = ({ enquiry }) => (
  <tr>
    <td
      colSpan={8}
      className="px-5 py-4 bg-[var(--bg-body)] border-b border-[var(--border-color)]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
        <div>
          <p className="text-caption font-semibold text-[var(--text-muted)] mb-1">
            Full Message
          </p>
          <p className="text-small text-[var(--text-body)] whitespace-pre-wrap">
            {enquiry.message || "No message"}
          </p>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-caption font-semibold text-[var(--text-muted)]">
              Phone
            </p>
            <p className="text-small text-[var(--text-body)]">
              {enquiry.phone || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-caption font-semibold text-[var(--text-muted)]">
              IP Address
            </p>
            <p className="text-small text-[var(--text-body)] font-mono">
              {enquiry.ip_address || "Unknown"}
            </p>
          </div>
          <div>
            <p className="text-caption font-semibold text-[var(--text-muted)]">
              Submitted
            </p>
            <p className="text-small text-[var(--text-body)]">
              {enquiry.created_at
                ? new Date(enquiry.created_at).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </td>
  </tr>
);

// ─── Mobile Card Layout ─────────────────────────────────────────
const MobileCard = ({
  enquiry,
  expanded,
  onToggle,
  onStatusChange,
  updatingId,
}) => (
  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="text-small font-bold text-[var(--text-heading)] truncate">
          {enquiry.name}
        </p>
        <p className="text-caption text-[var(--text-muted)] truncate">
          {enquiry.email}
        </p>
      </div>
      <StatusBadge
        status={enquiry.status}
        enquiryId={enquiry.id}
        onStatusChange={onStatusChange}
        isUpdating={updatingId === enquiry.id}
      />
    </div>
    <div className="flex items-center justify-between">
      <span className="text-caption text-primary font-medium truncate max-w-[180px]">
        {enquiry.course}
      </span>
      <div className="flex items-center gap-1.5">
        {enquiry.brevo_synced ? (
          <MailCheck className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <MailX className="w-3.5 h-3.5 text-red-500" />
        )}
        <span className="text-caption text-[var(--text-muted)]">
          {new Date(enquiry.created_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>
    </div>
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-center gap-1 pt-2 border-t border-[var(--border-color)] text-caption font-medium text-primary"
    >
      {expanded ? "Hide Details" : "View Details"}
      {expanded ? (
        <ChevronUp className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )}
    </button>
    {expanded && (
      <div className="pt-3 border-t border-[var(--border-color)] space-y-2">
        <div>
          <p className="text-caption font-semibold text-[var(--text-muted)]">
            Message
          </p>
          <p className="text-small text-[var(--text-body)] whitespace-pre-wrap">
            {enquiry.message || "No message"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-caption font-semibold text-[var(--text-muted)]">
              Phone
            </p>
            <p className="text-caption text-[var(--text-body)]">
              {enquiry.phone || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-caption font-semibold text-[var(--text-muted)]">
              IP
            </p>
            <p className="text-caption text-[var(--text-body)] font-mono">
              {enquiry.ip_address || "N/A"}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);

// ─── Main Component ─────────────────────────────────────────────
const EnquiryTable = ({ fetchEnquiries, updateStatus }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 25,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");

  const debounceRef = useRef(null);

  const loadData = useCallback(
    async (params = {}) => {
      try {
        setLoading(true);
        setError("");

        const queryParams = {
          page: params.page || pagination.page,
          limit: params.limit || pagination.limit,
          sort: "desc",
          ...(search && { search }),
          ...(course && { course }),
          ...(status && { status }),
          ...params,
        };

        const res = await fetchEnquiries(queryParams);

        if (res.success) {
          setData(res.data);
          setPagination(res.pagination);

          // Build a robust list of all possible courses: actual courses + common inquiry types + any unique ones in current page
          if (courseOptions.length === 0) {
            import("../data/courses").then(({ courses }) => {
              const standardCourses = courses.map((c) => c.title);
              const otherInquiries = [
                "Free Career Counseling",
                "Corporate AI Training",
                "Placement Assistance",
                "Download Brochure",
                "General Inquiry"
              ];
              const dbCourses = res.data.map((d) => d.course).filter(Boolean);
              
              const uniqueCourses = [
                ...new Set([...standardCourses, ...otherInquiries, ...dbCourses]),
              ];
              setCourseOptions(uniqueCourses);
            });
          }
        } else {
          setError(res.message || "Failed to load data");
        }
      } catch (err) {
        if (err.message === "SESSION_EXPIRED") {
          window.location.reload();
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [
      fetchEnquiries,
      search,
      course,
      status,
      pagination.page,
      pagination.limit,
      courseOptions.length,
    ],
  );

  // Initial load
  useEffect(() => {
    loadData({ page: 1 });
  }, []);

  // Reload on filter change (debounced for search)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadData({ page: 1 });
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [search, course, status]);

  const handlePageChange = (newPage) => {
    loadData({ page: newPage });
  };

  const handleLimitChange = (newLimit) => {
    loadData({ page: 1, limit: newLimit });
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await updateStatus(id, newStatus);
      if (res.success) {
        setData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item,
          ),
        );
      } else {
        console.error("Failed to update status:", res.message);
        alert(res.message || "Failed to update status. Please try again.");
      }
    } catch (err) {
      if (err.message === "SESSION_EXPIRED") {
        window.location.reload();
        return;
      }
      console.error("Status update error:", err);
      alert("Failed to update status. Check console for details.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setCourse("");
    setStatus("");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="heading-md text-[var(--text-heading)]">Enquiries</h1>
          <p className="text-body text-[var(--text-muted)] mt-1">
            Manage and track all student enquiries.
          </p>
        </div>
        <button
          onClick={() => loadData({ page: pagination.page })}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-small font-medium text-[var(--text-body)] hover:text-primary hover:border-primary/30 transition-all disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <Filters
        search={search}
        onSearchChange={setSearch}
        course={course}
        onCourseChange={setCourse}
        status={status}
        onStatusChange={setStatus}
        courseOptions={courseOptions}
        onReset={handleResetFilters}
      />

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-16">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-body text-red-500">{error}</p>
          <button
            onClick={() => loadData({ page: 1 })}
            className="btn-secondary mt-4 px-6 py-2 rounded-xl text-small"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && data.length === 0 && (
        <div className="text-center py-16 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl">
          <Inbox className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-50" />
          <p className="heading-sm text-[var(--text-heading)]">
            {search || course || status
              ? "No matching enquiries"
              : "No enquiries yet"}
          </p>
          <p className="text-small text-[var(--text-muted)] mt-2 max-w-sm mx-auto">
            {search || course || status
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Your leads will appear here once students submit enquiries through the website."}
          </p>
          {(search || course || status) && (
            <button
              onClick={handleResetFilters}
              className="btn-secondary mt-4 px-5 py-2 rounded-xl text-small"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Desktop Table */}
      {!loading && !error && data.length > 0 && (
        <>
          <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[var(--bg-body)]">
                    <th className="px-5 py-3 text-caption font-bold text-[var(--text-muted)] uppercase tracking-wide">
                      #
                    </th>
                    <th className="px-5 py-3 text-caption font-bold text-[var(--text-muted)] uppercase tracking-wide">
                      Name
                    </th>
                    <th className="px-5 py-3 text-caption font-bold text-[var(--text-muted)] uppercase tracking-wide">
                      Email
                    </th>
                    <th className="px-5 py-3 text-caption font-bold text-[var(--text-muted)] uppercase tracking-wide">
                      Course
                    </th>
                    <th className="px-5 py-3 text-caption font-bold text-[var(--text-muted)] uppercase tracking-wide">
                      Date
                    </th>
                    <th className="px-5 py-3 text-caption font-bold text-[var(--text-muted)] uppercase tracking-wide">
                      Email
                    </th>
                    <th className="px-5 py-3 text-caption font-bold text-[var(--text-muted)] uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-5 py-3 text-caption font-bold text-[var(--text-muted)] uppercase tracking-wide w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, idx) => (
                    <React.Fragment key={row.id}>
                      <tr
                        className={cn(
                          "border-b border-[var(--border-color)] transition-colors hover:bg-[var(--bg-body)]/50 cursor-pointer",
                          expandedId === row.id && "bg-[var(--bg-body)]/30",
                        )}
                        onClick={() =>
                          setExpandedId(expandedId === row.id ? null : row.id)
                        }
                      >
                        <td className="px-5 py-3 text-caption text-[var(--text-muted)]">
                          {(pagination.page - 1) * pagination.limit + idx + 1}
                        </td>
                        <td className="px-5 py-3 text-small font-semibold text-[var(--text-heading)] max-w-[160px] truncate">
                          {row.name}
                        </td>
                        <td className="px-5 py-3 text-small text-[var(--text-body)] max-w-[200px] truncate">
                          {row.email}
                        </td>
                        <td className="px-5 py-3 text-caption text-primary font-medium max-w-[180px] truncate">
                          {row.course}
                        </td>
                        <td className="px-5 py-3 text-caption text-[var(--text-muted)] whitespace-nowrap">
                          {new Date(row.created_at).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "2-digit",
                            },
                          )}
                        </td>
                        <td
                          className="px-5 py-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {row.brevo_synced ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-caption font-medium text-emerald-500">
                              <MailCheck className="w-3.5 h-3.5" /> Synced
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-500/10 text-caption font-medium text-red-500">
                              <MailX className="w-3.5 h-3.5" /> Failed
                            </span>
                          )}
                        </td>
                        <td
                          className="px-5 py-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <StatusBadge
                            status={row.status}
                            enquiryId={row.id}
                            onStatusChange={handleStatusChange}
                            isUpdating={updatingId === row.id}
                          />
                        </td>
                        <td className="px-5 py-3 text-[var(--text-muted)]">
                          {expandedId === row.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </td>
                      </tr>
                      {expandedId === row.id && <ExpandedRow enquiry={row} />}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {data.map((row) => (
              <MobileCard
                key={row.id}
                enquiry={row}
                expanded={expandedId === row.id}
                onToggle={() =>
                  setExpandedId(expandedId === row.id ? null : row.id)
                }
                onStatusChange={handleStatusChange}
                updatingId={updatingId}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}
    </div>
  );
};

export default EnquiryTable;

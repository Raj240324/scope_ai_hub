/**
 * useAdmin — Custom hook for admin authentication & API calls.
 *
 * Stores the admin password in sessionStorage (cleared on tab close).
 * All API calls include the password as a Bearer token.
 * Auto-logs out on 401 responses.
 */
import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'admin_token';

/**
 * Get the stored admin token from sessionStorage.
 * @returns {string|null}
 */
function getStoredToken() {
  try {
    const encoded = sessionStorage.getItem(STORAGE_KEY);
    return encoded ? atob(encoded) : null;
  } catch {
    return null;
  }
}

/**
 * Make an authenticated fetch request to admin API.
 * @param {string} url
 * @param {Object} options
 * @param {string} token
 * @returns {Promise<Object>}
 */
async function adminFetch(url, options = {}, token) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    sessionStorage.removeItem(STORAGE_KEY);
    throw new Error('SESSION_EXPIRED');
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

/**
 * Admin authentication and API hook.
 */
export function useAdmin() {
  const [token, setToken] = useState(getStoredToken);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getStoredToken());

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = useCallback(async (password) => {
    try {
      // Validate the password by making a test API call
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (res.status === 401) {
        throw new Error('Invalid password');
      }

      if (!res.ok) {
        throw new Error('Server error. Please try again.');
      }

      sessionStorage.setItem(STORAGE_KEY, btoa(password));
      setToken(password);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken(null);
  }, []);

  const fetchEnquiries = useCallback(async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return adminFetch(`/api/admin/enquiries?${query}`, {}, token);
  }, [token]);

  const fetchStats = useCallback(async () => {
    return adminFetch('/api/admin/stats', {}, token);
  }, [token]);

  const updateStatus = useCallback(async (id, status) => {
    return adminFetch('/api/admin/update-status', {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
    }, token);
  }, [token]);

  return {
    isAuthenticated,
    token,
    login,
    logout,
    fetchEnquiries,
    fetchStats,
    updateStatus,
  };
}

/**
 * /api/admin/enquiries.js — Admin Enquiries API
 *
 * Authenticated endpoint for fetching and managing enquiry submissions.
 * Uses Bearer token auth against ADMIN_PASSWORD env variable.
 *
 * Query params:
 *   ?search=   — Filter by name or email (partial match)
 *   ?course=   — Filter by exact course
 *   ?status=   — Filter by status (new, contacted, converted)
 *   ?page=1    — Page number (1-indexed)
 *   ?limit=25  — Items per page (max 100)
 *   ?sort=desc — Sort by created_at (asc or desc)
 */
import { generateRequestId, createLogger } from '../utils/logger.js';
import { setSecurityHeaders } from '../utils/sanitize.js';
import { getSupabase } from '../utils/supabase.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const MAX_LIMIT = 100;

/**
 * Validate Bearer token against ADMIN_PASSWORD.
 * @param {import('http').IncomingMessage} req
 * @returns {boolean}
 */
function isAuthenticated(req) {
  if (!ADMIN_PASSWORD) return false;
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  return token === ADMIN_PASSWORD;
}

export default async function handler(req, res) {
  const requestId = generateRequestId();
  const log = createLogger(requestId);
  setSecurityHeaders(res, requestId);

  // CORS for admin
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!isAuthenticated(req)) {
    log.warn('Admin auth failed', { ip: req.headers['x-forwarded-for'] || 'unknown' });
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  log.info('Admin enquiries accessed', { ip: req.headers['x-forwarded-for'] || 'unknown' });

  try {
    const supabase = getSupabase();
    const {
      search = '',
      course = '',
      status = '',
      page = '1',
      limit = '25',
      sort = 'desc',
      type = 'enquiries',
    } = req.query || {};

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(MAX_LIMIT, Math.max(1, parseInt(limit, 10) || 25));
    const offset = (pageNum - 1) * limitNum;
    const sortOrder = sort === 'asc' ? true : false;
    
    const tableName = type === 'trainers' ? 'trainer_applications' : 'enquiries';

    // Build query
    let query = supabase
      .from(tableName)
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: sortOrder })
      .range(offset, offset + limitNum - 1);

    // Search filter (name or email)
    if (search.trim()) {
      const term = `%${search.trim()}%`;
      query = query.or(`name.ilike.${term},email.ilike.${term}`);
    }

    // Course / Expertise filter
    if (course.trim()) {
      if (type === 'trainers') {
        query = query.eq('expertise', course.trim());
      } else {
        query = query.eq('course', course.trim());
      }
    }

    // Status filter
    if (status.trim()) {
      query = query.eq('status', status.trim());
    }

    const { data, error, count } = await query;

    if (error) {
      log.error('Supabase query failed', { error: error.message });
      return res.status(500).json({ success: false, message: 'Database query failed' });
    }

    log.info('Admin enquiries fetched', { count, page: pageNum });

    return res.status(200).json({
      success: true,
      data: data || [],
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (err) {
    log.error('Admin enquiries error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

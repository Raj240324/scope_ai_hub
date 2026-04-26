/**
 * /api/admin/stats.js — Admin Dashboard Statistics
 *
 * Returns aggregate counts for the admin dashboard:
 *  - Total enquiries, today's count, by status, by course
 *  - Total trainer applications
 *
 * Authenticated via Bearer token (ADMIN_PASSWORD).
 */
import { generateRequestId, createLogger } from '../utils/logger.js';
import { setSecurityHeaders } from '../utils/sanitize.js';
import { getSupabase } from '../utils/supabase.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

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
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!isAuthenticated(req)) {
    log.warn('Admin auth failed', { ip: req.headers['x-forwarded-for'] || 'unknown' });
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  log.info('Admin stats accessed', { ip: req.headers['x-forwarded-for'] || 'unknown' });

  try {
    const supabase = getSupabase();

    // Get today's date range (IST)
    const now = new Date();
    const todayStart = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    todayStart.setHours(0, 0, 0, 0);

    // Total enquiries
    const { count: totalEnquiries } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true });

    // Today's enquiries
    const { count: todayEnquiries } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart.toISOString());

    // Enquiries by status
    const { data: statusData } = await supabase
      .from('enquiries')
      .select('status');

    const statusCounts = { new: 0, contacted: 0, converted: 0 };
    if (statusData) {
      statusData.forEach((row) => {
        const s = (row.status || 'new').toLowerCase();
        if (statusCounts[s] !== undefined) {
          statusCounts[s]++;
        } else {
          statusCounts.new++;
        }
      });
    }

    // Enquiries by course (top 10)
    const { data: courseData } = await supabase
      .from('enquiries')
      .select('course');

    const courseMap = {};
    if (courseData) {
      courseData.forEach((row) => {
        const c = row.course || 'Unknown';
        courseMap[c] = (courseMap[c] || 0) + 1;
      });
    }
    const courseBreakdown = Object.entries(courseMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([course, count]) => ({ course, count }));

    // Brevo sync status
    const { count: brevoSynced } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('brevo_synced', true);

    // Total trainer applications
    let totalTrainers = 0;
    try {
      const { count } = await supabase
        .from('trainer_applications')
        .select('*', { count: 'exact', head: true });
      totalTrainers = count || 0;
    } catch {
      // Table may not exist
    }

    log.info('Admin stats fetched');

    return res.status(200).json({
      success: true,
      stats: {
        enquiries: {
          total: totalEnquiries || 0,
          today: todayEnquiries || 0,
          byStatus: statusCounts,
          byCourse: courseBreakdown,
          brevoSynced: brevoSynced || 0,
        },
        trainers: {
          total: totalTrainers,
        },
      },
    });
  } catch (err) {
    log.error('Admin stats error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

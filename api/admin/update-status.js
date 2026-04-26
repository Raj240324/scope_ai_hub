/**
 * /api/admin/update-status.js — Update Enquiry Status
 *
 * PATCH endpoint to update the status of an enquiry.
 * Authenticated via Bearer token (ADMIN_PASSWORD).
 *
 * Request body:
 *   { id: number, status: "new" | "contacted" | "converted" }
 */
import { generateRequestId, createLogger } from '../utils/logger.js';
import { setSecurityHeaders } from '../utils/sanitize.js';
import { getSupabase } from '../utils/supabase.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const VALID_STATUSES = ['new', 'contacted', 'converted'];

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

  if (req.method !== 'PATCH') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!isAuthenticated(req)) {
    log.warn('Admin auth failed', { ip: req.headers['x-forwarded-for'] || 'unknown' });
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  log.info('Admin status update accessed', { ip: req.headers['x-forwarded-for'] || 'unknown' });

  try {
    const { id, status } = req.body || {};

    if (!id || typeof id !== 'number') {
      return res.status(400).json({ success: false, message: 'Valid enquiry ID is required' });
    }

    if (!status || !VALID_STATUSES.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }

    const supabase = getSupabase();

    const { error } = await supabase
      .from('enquiries')
      .update({ status: status.toLowerCase() })
      .eq('id', id);

    if (error) {
      log.error('Status update failed', { error: error.message, id });
      return res.status(500).json({ success: false, message: 'Failed to update status' });
    }

    log.info('Enquiry status updated', { id, status: status.toLowerCase() });

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully',
    });
  } catch (err) {
    log.error('Update status error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

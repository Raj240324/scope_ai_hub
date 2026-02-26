/**
 * /api/health.js — Health Check Endpoint
 * Used by uptime monitoring services and container probes.
 */
export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}

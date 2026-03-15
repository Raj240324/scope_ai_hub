-- =============================================================================
-- SCOPE AI HUB — Data Retention Policy (24-month auto-purge)
-- =============================================================================
-- This script creates a PostgreSQL function + pg_cron scheduled job that
-- automatically deletes records older than 24 months from PII-containing
-- tables.
--
-- PREREQUISITES:
--   1. Enable the pg_cron extension in Supabase Dashboard:
--      Dashboard → Database → Extensions → Search "pg_cron" → Enable
--
--   2. Run this script in the SQL Editor.
--
-- SCHEDULE: Runs daily at 03:00 UTC (08:30 IST)
-- =============================================================================

-- ─── 1. Create the cleanup function ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.cleanup_old_records()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  enquiries_deleted INTEGER;
  trainers_deleted  INTEGER;
BEGIN
  -- Delete enquiries older than 24 months
  WITH deleted_enquiries AS (
    DELETE FROM public.enquiries
    WHERE created_at < NOW() - INTERVAL '24 months'
    RETURNING id
  )
  SELECT COUNT(*) INTO enquiries_deleted FROM deleted_enquiries;

  -- Delete trainer applications older than 24 months
  WITH deleted_trainers AS (
    DELETE FROM public.trainer_applications
    WHERE created_at < NOW() - INTERVAL '24 months'
    RETURNING id
  )
  SELECT COUNT(*) INTO trainers_deleted FROM deleted_trainers;

  -- Log results (visible in Supabase Logs → Postgres)
  RAISE LOG 'Data retention cleanup: deleted % enquiries, % trainer applications',
    enquiries_deleted, trainers_deleted;
END;
$$;

-- ─── 2. Schedule with pg_cron ────────────────────────────────────────────────

-- Remove existing job if present (idempotent)
SELECT cron.unschedule('cleanup-old-records')
WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'cleanup-old-records'
);

-- Schedule daily at 03:00 UTC
SELECT cron.schedule(
  'cleanup-old-records',
  '0 3 * * *',
  'SELECT public.cleanup_old_records()'
);

-- ─── 3. OPTIONAL: Run once immediately to verify ────────────────────────────
-- Uncomment the line below to test the function immediately:
-- SELECT public.cleanup_old_records();

-- ─── VERIFICATION ───────────────────────────────────────────────────────────
-- After running, verify the scheduled job exists:
--   SELECT * FROM cron.job WHERE jobname = 'cleanup-old-records';
--
-- Check execution history:
--   SELECT * FROM cron.job_run_details
--   WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'cleanup-old-records')
--   ORDER BY start_time DESC LIMIT 10;
-- =============================================================================

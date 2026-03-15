-- =============================================================================
-- SCOPE AI HUB — Supabase Row Level Security (RLS) Policies
-- =============================================================================
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
--
-- Purpose:
--   1. Enable RLS on enquiries and trainer_applications tables
--   2. Restrict the anon (public) role to zero access
--   3. Allow the service_role to INSERT + UPDATE (for brevo_synced flag)
--   4. Block SELECT/DELETE from all non-admin roles
--
-- The service_role key used by Vercel serverless functions bypasses RLS by
-- default, so these policies primarily protect against:
--   • Accidental exposure of the anon key in frontend code
--   • Direct Supabase REST API access without proper credentials
-- =============================================================================

-- ─── 1. Enable RLS ──────────────────────────────────────────────────────────

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainer_applications ENABLE ROW LEVEL SECURITY;

-- ─── 2. Revoke all default permissions from anon and authenticated roles ────

REVOKE ALL ON public.enquiries FROM anon;
REVOKE ALL ON public.enquiries FROM authenticated;

REVOKE ALL ON public.trainer_applications FROM anon;
REVOKE ALL ON public.trainer_applications FROM authenticated;

-- ─── 3. Drop any existing permissive policies (clean slate) ─────────────────

DROP POLICY IF EXISTS "Deny all for anon on enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Deny all for anon on trainer_applications" ON public.trainer_applications;
DROP POLICY IF EXISTS "Deny all for authenticated on enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Deny all for authenticated on trainer_applications" ON public.trainer_applications;

-- ─── 4. Create deny-all policies for anon role ──────────────────────────────

-- These explicit policies ensure that even if RLS is enabled, the anon
-- role cannot read, insert, update, or delete any rows.

CREATE POLICY "Deny select for anon on enquiries"
  ON public.enquiries
  FOR SELECT
  TO anon
  USING (false);

CREATE POLICY "Deny insert for anon on enquiries"
  ON public.enquiries
  FOR INSERT
  TO anon
  WITH CHECK (false);

CREATE POLICY "Deny update for anon on enquiries"
  ON public.enquiries
  FOR UPDATE
  TO anon
  USING (false);

CREATE POLICY "Deny delete for anon on enquiries"
  ON public.enquiries
  FOR DELETE
  TO anon
  USING (false);

CREATE POLICY "Deny select for anon on trainer_applications"
  ON public.trainer_applications
  FOR SELECT
  TO anon
  USING (false);

CREATE POLICY "Deny insert for anon on trainer_applications"
  ON public.trainer_applications
  FOR INSERT
  TO anon
  WITH CHECK (false);

CREATE POLICY "Deny update for anon on trainer_applications"
  ON public.trainer_applications
  FOR UPDATE
  TO anon
  USING (false);

CREATE POLICY "Deny delete for anon on trainer_applications"
  ON public.trainer_applications
  FOR DELETE
  TO anon
  USING (false);

-- ─── 5. Create deny-all policies for authenticated role ─────────────────────

CREATE POLICY "Deny select for authenticated on enquiries"
  ON public.enquiries
  FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "Deny insert for authenticated on enquiries"
  ON public.enquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "Deny update for authenticated on enquiries"
  ON public.enquiries
  FOR UPDATE
  TO authenticated
  USING (false);

CREATE POLICY "Deny delete for authenticated on enquiries"
  ON public.enquiries
  FOR DELETE
  TO authenticated
  USING (false);

CREATE POLICY "Deny select for authenticated on trainer_applications"
  ON public.trainer_applications
  FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "Deny insert for authenticated on trainer_applications"
  ON public.trainer_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "Deny update for authenticated on trainer_applications"
  ON public.trainer_applications
  FOR UPDATE
  TO authenticated
  USING (false);

CREATE POLICY "Deny delete for authenticated on trainer_applications"
  ON public.trainer_applications
  FOR DELETE
  TO authenticated
  USING (false);

-- ─── VERIFICATION ───────────────────────────────────────────────────────────
-- After running, verify in Supabase Dashboard → Authentication → Policies
-- Both tables should show RLS: ENABLED with deny-all policies for anon and
-- authenticated roles.
--
-- The service_role key bypasses RLS entirely, so your Vercel serverless
-- functions will continue to work without any code changes.
-- =============================================================================

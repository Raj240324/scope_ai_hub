/**
 * /api/health.js — Health Check Endpoint
 *
 * Security hardened:
 *  • Bearer token required (HEALTH_CHECK_TOKEN env var)
 *  • Falls back to basic "alive" response if no token configured
 *  • Never exposes internal service names to unauthenticated callers
 */
import { createClient } from "@supabase/supabase-js";

const HEALTH_TOKEN = process.env.HEALTH_CHECK_TOKEN;

export default async function handler(req, res) {

  // ── Security: Only allow GET ──────────────────────────────────────
  if (req.method !== "GET") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  // ── Security: Bearer token gate ───────────────────────────────────
  // If HEALTH_CHECK_TOKEN is configured, require it.
  // This prevents unauthenticated reconnaissance.
  if (HEALTH_TOKEN) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : "";

    if (token !== HEALTH_TOKEN) {
      // Return a minimal "alive" response without service details
      return res.status(200).json({ status: "ok" });
    }
  }

  // ── Authenticated health check (full details) ─────────────────────
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store");

  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {}
  };

  /* Environment Variables */

  if (
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !process.env.BREVO_API_KEY
  ) {
    health.services.environment = "missing";
    health.status = "degraded";
  } else {
    health.services.environment = "ok";
  }

  /* Supabase Check */

  try {

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error } = await supabase
      .from("enquiries")
      .select("id")
      .limit(1);

    health.services.supabase = error ? "error" : "ok";

    if (error) health.status = "degraded";

  } catch {

    health.services.supabase = "error";
    health.status = "degraded";

  }

  /* Brevo Check */

  try {

    const response = await fetch("https://api.brevo.com/v3/account", {
      headers: {
        "api-key": process.env.BREVO_API_KEY
      }
    });

    health.services.brevo = response.ok ? "ok" : "error";

    if (!response.ok) health.status = "degraded";

  } catch {

    health.services.brevo = "error";
    health.status = "degraded";

  }

  res.status(200).json(health);

}
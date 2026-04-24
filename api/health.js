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
 // ── Security: Allow GET and HEAD ──────────────────────────────────
    if (req.method !== "GET" && req.method !== "HEAD") {
      return res.status(405).json({ status: "error", message: "Method not allowed" });
    }

    // Monitoring tools use HEAD requests
    if (req.method === "HEAD") {
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).end();
    }

  // ── Security: Bearer token gate ───────────────────────────────────
  // Require HEALTH_CHECK_TOKEN to be both configured on the server and provided by the client.
  // This prevents unauthenticated reconnaissance and accidental exposure.
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : "";

  if (!HEALTH_TOKEN || token !== HEALTH_TOKEN) {
    // Return a minimal "alive" response without service details
    return res.status(200).json({ status: "ok" });
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
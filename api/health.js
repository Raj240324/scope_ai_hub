import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

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
# GitHub Actions — Workflow Documentation

## Active Workflows

### supabase-heartbeat.yml ✅ ACTIVE
- **Purpose:** Prevents Supabase Free Tier from auto-pausing
- **Schedule:** Every 30 minutes
- **Endpoint:** /api/health
- **Do not disable**

## External Monitoring
- Tool: UptimeRobot (free plan)
- Monitors:
  - https://scopeaihub.com → every 5 minutes
  - https://scopeaihub.com/api/health → every 5 minutes
  - https://scopeaihub.com/api/health → every 30 minutes
- Alert method: Email

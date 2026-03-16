# Data Models

## `BRANDING` (`src/data/branding.js`)
- Organization identity: `name`, `suffix`, `fullName`, `tagline`, `description`
- Assets: `logo`, `logoLight`, `logoDark`
- Contact: `email`, `phone`, `whatsapp`, `address`, `regions`
- Time/location metadata: `established`, `location`, `officeHours`
- Leadership metadata: `founder`, `ceo`
- Social links object: `socials`

## `courses` (`src/data/courses.js`)
- Per-course fields:
  - `id`, `slug`, `tier`, `title`, `tagline`
  - `duration`, `salaryRange`
  - `modules[]` with `code`, `title`
  - `whoCanLearn[]`
  - `prerequisites[]`
  - `roles[]` with `icon`, `title`
- Companion structures:
  - `TIERS` array
  - `tierMeta` object (`label`, `heading`, `description`, `color`, `softBg`, `borderColor`, `emoji`)

## `addons` (`src/data/addons.js`)
- Add-on fields:
  - `icon`, `title`, `description`, `isFree`
- Used in admissions/career-support style sections and grids

## `batches` (`src/data/batches.js`)
- Batch schedule fields:
  - `title`, `days`, `time`, `desc`
  - `mode`, `status`, `emoji`
  - visual metadata (`statusColor`, `accent`, `glow`, `cardBg`)

## API Payload Models (Frontend → Serverless)
- Student enquiry payload (from `ContactForm`):
  - `user_name`, `user_email`, `user_phone`, `user_location`
  - `qualification`, `inquiry_type`, `program_interest`, `message`
  - `recaptchaToken`, `formLoadedAt`, optional honeypot `website`
- Trainer payload (from `TrainerForm`):
  - `trainer_name`, `trainer_email`, `trainer_phone`
  - `experience`, `expertise`, `linkedin_url`
  - `recaptchaToken`, `formLoadedAt`, optional honeypot `website`

## Persistence Models (Serverless → Supabase)
- `enquiries` table insert shape:
  - `name`, `email`, `phone`, `course`, `message`, `ip_address`, `user_agent`, `brevo_synced`
- `trainer_applications` table insert shape:
  - `name`, `email`, `phone`, `experience`, `expertise`, `linkedin_url`, `ip_address`, `user_agent`

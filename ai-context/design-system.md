# Design System

## Styling Stack
- Tailwind CSS v4 loaded via `@import "tailwindcss"` in `src/index.css`
- PostCSS plugins: `@tailwindcss/postcss`, `autoprefixer`
- CSS-first tokens via `@theme` and custom properties in `:root` / `.dark`

## Theme Model
- Theme source: `ThemeContext` (`light` | `dark`)
- Theme persistence: `localStorage.theme`
- Theme application: class toggle on `<html>`
- Components use CSS variables for backgrounds, text, borders, and accents

## Core Tokens and Utility Classes
- Color tokens: brand pink/violet palette and semantic variables (`--bg-body`, `--text-heading`, `--border-color`, etc.)
- Layout utilities: `container-custom`, `section-padding`
- Surfaces: `glass-card`, `glass-button`, `dark-section`, `dark-surface`, `light-surface`
- Buttons: `btn-primary`, `btn-secondary`
- Typography classes:
  - `heading-hero`, `heading-lg`, `heading-md`, `heading-sm`
  - `text-body-lg`, `text-body`, `text-small`, `text-caption`, `text-muted`

## Component Styling Patterns
- Header uses inline style object + responsive CSS in component
- Many sections combine utility classes with variable-driven color tokens
- Route-level pages consistently use `Layout` and `SEO` wrappers

## Accessibility Style Hooks
- Global focus-visible outline styling
- Reduced-motion media query reducing animation/transition durations
- Scrollbar custom styling and image rendering defaults

## Cautions Based on Current Code
- Some components still use direct color classes/inline values for specific effects
- Keep theme compatibility checks when changing section surfaces or text contrast

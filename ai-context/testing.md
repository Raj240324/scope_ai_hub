# Testing

## Test Stack
- Runner: Vitest
- React support: `@testing-library/react`
- Environment: `jsdom`
- Global test APIs enabled (`globals: true`)

## Configuration
- Config file: `vitest.config.js`
- Test include pattern: `src/**/__tests__/**/*.test.{js,jsx}`

## Existing Tests
- `src/utils/__tests__/apiErrorHandler.test.js`
- `src/utils/__tests__/rateLimiter.test.js`

## Command Surface
- `npm run test` — single run
- `npm run test:watch` — watch mode
- `npm run lint` — ESLint over JS/JSX

## Validation Notes for Context Maintenance
- Context file updates are documentation-only and typically do not affect test behavior
- When architecture docs reveal route/config mismatch, validate by checking:
  - `src/App.jsx`
  - `scripts/generate-sitemap.js`
  - `package.json` reactSnap include list

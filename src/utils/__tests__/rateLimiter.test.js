import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const store = {};
const localStorageMock = {
  getItem: vi.fn((key) => store[key] || null),
  setItem: vi.fn((key, value) => { store[key] = value; }),
  removeItem: vi.fn((key) => { delete store[key]; }),
  clear: vi.fn(() => { Object.keys(store).forEach((key) => delete store[key]); }),
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

// Import after mocking
import { checkRateLimit } from '../rateLimiter';

describe('checkRateLimit', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('allows the first submission', () => {
    expect(() => checkRateLimit()).not.toThrow();
  });

  it('allows up to 3 submissions', () => {
    expect(() => checkRateLimit()).not.toThrow();
    expect(() => checkRateLimit()).not.toThrow();
    expect(() => checkRateLimit()).not.toThrow();
  });

  it('throws on the 4th submission within the window', () => {
    checkRateLimit();
    checkRateLimit();
    checkRateLimit();
    expect(() => checkRateLimit()).toThrow(/Too many submissions/);
  });

  it('allows submissions after timestamps expire', () => {
    // Inject expired timestamps (> 60s ago)
    const oldTimestamps = [Date.now() - 70000, Date.now() - 80000, Date.now() - 90000];
    store['enquiry_rate_limit'] = JSON.stringify(oldTimestamps);

    // Should pass since all timestamps are expired
    expect(() => checkRateLimit()).not.toThrow();
  });

  it('handles corrupted localStorage gracefully', () => {
    store['enquiry_rate_limit'] = 'not-valid-json!!!';
    expect(() => checkRateLimit()).not.toThrow();
  });
});

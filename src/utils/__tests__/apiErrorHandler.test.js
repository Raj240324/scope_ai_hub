import { describe, it, expect } from 'vitest';
import { handleApiError, normalizeError } from '../apiErrorHandler';

describe('handleApiError', () => {
  it('returns server message when present in JSON body', async () => {
    const response = new Response(JSON.stringify({ message: 'Custom error from server' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
    const msg = await handleApiError(response);
    expect(msg).toBe('Custom error from server');
  });

  it('returns generic message for 429 without body', async () => {
    const response = new Response('', { status: 429 });
    const msg = await handleApiError(response);
    expect(msg).toContain('Too many requests');
  });

  it('returns generic message for 500', async () => {
    const response = new Response('Internal Server Error', { status: 500 });
    const msg = await handleApiError(response);
    expect(msg).toContain('Something went wrong');
  });

  it('handles non-JSON response bodies gracefully', async () => {
    const response = new Response('<html>error</html>', { status: 502 });
    const msg = await handleApiError(response);
    expect(msg).toContain('temporarily unavailable');
  });

  it('returns fallback for unknown status codes', async () => {
    const response = new Response('', { status: 418 });
    const msg = await handleApiError(response);
    expect(msg).toContain('Something went wrong'); // falls back to 500 message
  });
});

describe('normalizeError', () => {
  it('detects AbortError (timeout)', () => {
    const err = new DOMException('signal is aborted', 'AbortError');
    const msg = normalizeError(err);
    expect(msg).toContain('timed out');
  });

  it('returns error message for standard errors', () => {
    const msg = normalizeError(new Error('Network failure'));
    expect(msg).toBe('Network failure');
  });

  it('returns fallback for undefined error', () => {
    const msg = normalizeError(undefined);
    expect(msg).toContain('unexpected error');
  });
});

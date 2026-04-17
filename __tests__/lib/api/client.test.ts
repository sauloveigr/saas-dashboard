import { describe, it, expect, vi, afterEach } from 'vitest'
import { ApiError, apiClient } from '@/lib/api/client'

const originalFetch = global.fetch

afterEach(() => {
  global.fetch = originalFetch
  vi.resetAllMocks()
})

describe('ApiError', () => {
  it('stores name, message, and status', () => {
    const error = new ApiError('Rate limited', 429)
    expect(error.name).toBe('ApiError')
    expect(error.message).toBe('Rate limited')
    expect(error.status).toBe(429)
  })

  it('extends Error', () => {
    expect(new ApiError('test')).toBeInstanceOf(Error)
  })

  it('allows status to be omitted', () => {
    expect(new ApiError('network error').status).toBeUndefined()
  })
})

describe('apiClient', () => {
  it('returns parsed JSON on 200 response', async () => {
    const payload = [{ id: 'bitcoin' }]
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(payload),
    })

    await expect(apiClient('/coins/markets')).resolves.toEqual(payload)
  })

  it('throws ApiError with status code on non-ok response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
    })

    let caught: unknown
    try {
      await apiClient('/coins/markets')
    } catch (err) {
      caught = err
    }

    expect(caught).toBeInstanceOf(ApiError)
    expect((caught as ApiError).status).toBe(429)
  })

  it('wraps network errors in ApiError', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))

    await expect(apiClient('/coins/markets')).rejects.toBeInstanceOf(ApiError)
  })

  it('sends Content-Type: application/json header', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) })

    await apiClient('/test')

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      }),
    )
  })

  it('builds the correct full URL', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) })

    await apiClient('/coins/markets?vs_currency=usd')

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
      expect.any(Object),
    )
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { CryptoMarketData, CryptoChartData, GlobalMarketData, TrendingResponse } from '@/types/crypto'

vi.mock('@/lib/mocks/mock-config', () => ({
  shouldFallbackOnError: vi.fn(),
  shouldFallbackOnTimeout: vi.fn(),
  getTimeoutMs: vi.fn(() => 5000),
  logMockFallback: vi.fn(),
}))

vi.mock('@/lib/mocks/crypto-mock-data', () => ({
  getMockMarketData: vi.fn(),
  getMockChartData: vi.fn(),
  getMockGlobalData: vi.fn(),
  getMockTrendingCoins: vi.fn(),
}))

import {
  provideMarketData,
  provideChartData,
  provideGlobalData,
  provideTrendingData,
  DataProviderError,
} from '@/lib/services/crypto-data-provider'
import * as mockConfig from '@/lib/mocks/mock-config'
import * as mockData from '@/lib/mocks/crypto-mock-data'

const fakeMarketData = [{ id: 'bitcoin', name: 'Bitcoin' }] as CryptoMarketData[]
const fakeChartData = { prices: [[1700000000000, 67000]], market_caps: [], total_volumes: [] } as unknown as CryptoChartData
const fakeGlobalData = { data: { active_cryptocurrencies: 100 } } as unknown as GlobalMarketData
const fakeTrendingData = { coins: [] } as TrendingResponse

beforeEach(() => {
  vi.mocked(mockConfig.shouldFallbackOnError).mockReturnValue(true)
  vi.mocked(mockConfig.shouldFallbackOnTimeout).mockReturnValue(false)
})

describe('DataProviderError', () => {
  it('stores name, usedFallback, and originalError', () => {
    const original = new Error('root cause')
    const error = new DataProviderError('failed', false, original)

    expect(error.name).toBe('DataProviderError')
    expect(error.usedFallback).toBe(false)
    expect(error.originalError).toBe(original)
  })

  it('extends Error', () => {
    expect(new DataProviderError('test')).toBeInstanceOf(Error)
  })
})

describe('provideMarketData', () => {
  it('returns API data when API call succeeds', async () => {
    const apiFn = vi.fn().mockResolvedValue(fakeMarketData)

    const result = await provideMarketData(apiFn)

    expect(result).toEqual(fakeMarketData)
    expect(apiFn).toHaveBeenCalledOnce()
  })

  it('returns mock data when API fails and fallbackOnError is true', async () => {
    const apiFn = vi.fn().mockRejectedValue(new Error('API down'))
    vi.mocked(mockData.getMockMarketData).mockReturnValue(fakeMarketData)

    const result = await provideMarketData(apiFn)

    expect(result).toEqual(fakeMarketData)
  })

  it('throws DataProviderError when API fails and fallbackOnError is false', async () => {
    vi.mocked(mockConfig.shouldFallbackOnError).mockReturnValue(false)
    const apiFn = vi.fn().mockRejectedValue(new Error('API down'))

    await expect(provideMarketData(apiFn)).rejects.toBeInstanceOf(DataProviderError)
  })

  it('passes params to getMockMarketData on fallback', async () => {
    const apiFn = vi.fn().mockRejectedValue(new Error('API down'))
    vi.mocked(mockData.getMockMarketData).mockReturnValue(fakeMarketData)
    const params = { ids: ['bitcoin'], per_page: 1 }

    await provideMarketData(apiFn, params)

    expect(mockData.getMockMarketData).toHaveBeenCalledWith({ ids: params.ids, per_page: params.per_page })
  })
})

describe('provideChartData', () => {
  it('returns API data when API call succeeds', async () => {
    const apiFn = vi.fn().mockResolvedValue(fakeChartData)

    await expect(provideChartData(apiFn, 'bitcoin')).resolves.toEqual(fakeChartData)
  })

  it('returns mock chart data for the correct coinId on fallback', async () => {
    const apiFn = vi.fn().mockRejectedValue(new Error('timeout'))
    vi.mocked(mockData.getMockChartData).mockReturnValue(fakeChartData)

    const result = await provideChartData(apiFn, 'ethereum')

    expect(result).toEqual(fakeChartData)
    expect(mockData.getMockChartData).toHaveBeenCalledWith('ethereum')
  })
})

describe('provideGlobalData', () => {
  it('returns API data on success', async () => {
    const apiFn = vi.fn().mockResolvedValue(fakeGlobalData)

    await expect(provideGlobalData(apiFn)).resolves.toEqual(fakeGlobalData)
  })

  it('returns mock global data on failure', async () => {
    const apiFn = vi.fn().mockRejectedValue(new Error('API down'))
    vi.mocked(mockData.getMockGlobalData).mockReturnValue(fakeGlobalData)

    await expect(provideGlobalData(apiFn)).resolves.toEqual(fakeGlobalData)
  })
})

describe('provideTrendingData', () => {
  it('returns API data on success', async () => {
    const apiFn = vi.fn().mockResolvedValue(fakeTrendingData)

    await expect(provideTrendingData(apiFn)).resolves.toEqual(fakeTrendingData)
  })

  it('returns mock trending data on failure', async () => {
    const apiFn = vi.fn().mockRejectedValue(new Error('API down'))
    vi.mocked(mockData.getMockTrendingCoins).mockReturnValue(fakeTrendingData)

    await expect(provideTrendingData(apiFn)).resolves.toEqual(fakeTrendingData)
  })
})

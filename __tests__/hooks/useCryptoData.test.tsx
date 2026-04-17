import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { createWrapper } from '../test-utils'
import {
  useTopCryptos,
  useTopCryptosByMarketCap,
  useCryptoChart,
  useMarketShareData,
  useVolumeData,
  useTrendingCoins,
  useMarketMovers,
} from '@/hooks/useCryptoData'
import type { CryptoMarketData } from '@/types/crypto'

vi.mock('@/lib/api/coingecko', () => ({
  getTopCryptos: vi.fn(),
  getTopCryptosByMarketCap: vi.fn(),
  getMarketChart: vi.fn(),
  getGlobalMarketData: vi.fn(),
  getTopCryptosByVolume: vi.fn(),
  getTrendingCoins: vi.fn(),
  getTopGainersLosers: vi.fn(),
}))

import * as coingecko from '@/lib/api/coingecko'

const makeCrypto = (overrides: Partial<CryptoMarketData> = {}): CryptoMarketData => ({
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image: 'https://example.com/btc.png',
  current_price: 67000,
  market_cap: 60000,
  market_cap_rank: 1,
  fully_diluted_valuation: null,
  total_volume: 28000000,
  high_24h: 68000,
  low_24h: 66000,
  price_change_24h: 1000,
  price_change_percentage_24h: 1.5,
  market_cap_change_24h: 500,
  market_cap_change_percentage_24h: 0.8,
  circulating_supply: 19000000,
  total_supply: 21000000,
  max_supply: 21000000,
  ath: 69000,
  ath_change_percentage: -3,
  ath_date: '2021-11-10',
  atl: 67,
  atl_change_percentage: 99000,
  atl_date: '2013-07-06',
  last_updated: '2024-01-01',
  ...overrides,
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useTopCryptos', () => {
  it('returns data from API', async () => {
    vi.mocked(coingecko.getTopCryptos).mockResolvedValue([makeCrypto()])

    const { result } = renderHook(() => useTopCryptos(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(1)
    expect(result.current.data![0].id).toBe('bitcoin')
  })

  it('starts in loading state', () => {
    vi.mocked(coingecko.getTopCryptos).mockResolvedValue([])

    const { result } = renderHook(() => useTopCryptos(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(true)
  })

  it('exposes error when API fails', async () => {
    vi.mocked(coingecko.getTopCryptos).mockRejectedValue(new Error('API down'))

    const { result } = renderHook(() => useTopCryptos(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeInstanceOf(Error)
  })
})

describe('useTopCryptosByMarketCap', () => {
  it('passes limit to getTopCryptosByMarketCap', async () => {
    vi.mocked(coingecko.getTopCryptosByMarketCap).mockResolvedValue([])

    const { result } = renderHook(() => useTopCryptosByMarketCap(10), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(coingecko.getTopCryptosByMarketCap).toHaveBeenCalledWith(10)
  })
})

describe('useCryptoChart', () => {
  const t0 = 1700000000000
  const t1 = 1700003600000
  const t2 = 1700007200000

  it('transforms prices into FormattedChartData', async () => {
    vi.mocked(coingecko.getMarketChart).mockResolvedValue({
      prices: [[t0, 67000], [t1, 67500], [t2, 68000]],
      market_caps: [],
      total_volumes: [],
    })

    const { result } = renderHook(() => useCryptoChart('bitcoin', '7'), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const data = result.current.data!
    expect(data).toHaveLength(3)
    expect(data[0]).toMatchObject({ timestamp: t0, price: 67000 })
    expect(data[1]).toMatchObject({ timestamp: t1, price: 67500 })
    expect(data[2]).toMatchObject({ timestamp: t2, price: 68000 })
  })

  it('first point has no previousPrice, subsequent points do', async () => {
    vi.mocked(coingecko.getMarketChart).mockResolvedValue({
      prices: [[t0, 67000], [t1, 67500], [t2, 68000]],
      market_caps: [],
      total_volumes: [],
    })

    const { result } = renderHook(() => useCryptoChart('bitcoin', '7'), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const data = result.current.data!
    expect(data[0].previousPrice).toBeUndefined()
    expect(data[1].previousPrice).toBe(67000)
    expect(data[2].previousPrice).toBe(67500)
  })

  it('each point has a non-empty date string', async () => {
    vi.mocked(coingecko.getMarketChart).mockResolvedValue({
      prices: [[t0, 67000]],
      market_caps: [],
      total_volumes: [],
    })

    const { result } = renderHook(() => useCryptoChart('bitcoin', '7'), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(typeof result.current.data![0].date).toBe('string')
    expect(result.current.data![0].date.length).toBeGreaterThan(0)
  })
})

describe('useMarketShareData', () => {
  it('calculates market cap percentage for each coin', async () => {
    const btc = makeCrypto({ id: 'bitcoin', name: 'Bitcoin', market_cap: 60000 })
    const eth = makeCrypto({ id: 'ethereum', name: 'Ethereum', symbol: 'eth', market_cap: 40000 })
    vi.mocked(coingecko.getTopCryptosByMarketCap).mockResolvedValue([btc, eth])

    const { result } = renderHook(() => useMarketShareData(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const data = result.current.data!
    expect(data[0]).toMatchObject({ name: 'Bitcoin', value: 60 })
    expect(data[1]).toMatchObject({ name: 'Ethereum', value: 40 })
  })

  it('assigns an hsl color to each item', async () => {
    vi.mocked(coingecko.getTopCryptosByMarketCap).mockResolvedValue([makeCrypto()])

    const { result } = renderHook(() => useMarketShareData(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data![0].color).toMatch(/^hsl/)
  })
})

describe('useVolumeData', () => {
  it('maps to uppercased symbol and total_volume', async () => {
    const btc = makeCrypto({ symbol: 'btc', total_volume: 28000000 })
    const eth = makeCrypto({ id: 'ethereum', symbol: 'eth', total_volume: 15000000 })
    vi.mocked(coingecko.getTopCryptosByVolume).mockResolvedValue([btc, eth])

    const { result } = renderHook(() => useVolumeData(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual([
      { name: 'BTC', volume: 28000000 },
      { name: 'ETH', volume: 15000000 },
    ])
  })
})

describe('useTrendingCoins', () => {
  it('extracts .item from each coin and limits result to 7', async () => {
    const coins = Array.from({ length: 10 }, (_, i) => ({
      item: {
        id: `coin-${i}`,
        name: `Coin ${i}`,
        symbol: `C${i}`,
        market_cap_rank: i + 1,
        price_btc: 0.001 * i,
        thumb: 'https://example.com/thumb.png',
        score: i,
      },
    }))
    vi.mocked(coingecko.getTrendingCoins).mockResolvedValue({ coins })

    const { result } = renderHook(() => useTrendingCoins(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(7)
    expect(result.current.data![0].id).toBe('coin-0')
    expect(result.current.data![6].id).toBe('coin-6')
  })
})

describe('useMarketMovers', () => {
  it('limits result to 5 and uppercases symbol', async () => {
    const movers = Array.from({ length: 8 }, (_, i) =>
      makeCrypto({ id: `coin-${i}`, symbol: `c${i}`, name: `Coin ${i}` })
    )
    vi.mocked(coingecko.getTopGainersLosers).mockResolvedValue(movers)

    const { result } = renderHook(() => useMarketMovers(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(5)
    expect(result.current.data![0].symbol).toBe('C0')
  })

  it('maps all required PriceChange fields', async () => {
    vi.mocked(coingecko.getTopGainersLosers).mockResolvedValue([makeCrypto()])

    const { result } = renderHook(() => useMarketMovers(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const item = result.current.data![0]
    expect(item).toHaveProperty('id')
    expect(item).toHaveProperty('symbol')
    expect(item).toHaveProperty('name')
    expect(item).toHaveProperty('image')
    expect(item).toHaveProperty('current_price')
    expect(item).toHaveProperty('price_change_percentage_24h')
    expect(item).toHaveProperty('price_change_24h')
    expect(item).toHaveProperty('market_cap_rank')
  })
})

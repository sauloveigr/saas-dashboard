import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import { TrendingCoins } from '@/components/dashboard/TrendingCoins'
import type { TrendingCoin } from '@/types/crypto'

const mockCoins: TrendingCoin[] = [
  {
    id: 'pepe',
    name: 'Pepe',
    symbol: 'PEPE',
    market_cap_rank: 45,
    price_btc: 0.0000000123,
    thumb: 'https://example.com/pepe.png',
    score: 0,
  },
  {
    id: 'bonk',
    name: 'Bonk',
    symbol: 'BONK',
    market_cap_rank: 67,
    price_btc: 0.0000000234,
    thumb: 'https://example.com/bonk.png',
    score: 1,
  },
]

describe('TrendingCoins', () => {
  it('shows "Trending Now" heading', () => {
    render(<TrendingCoins coins={mockCoins} />)

    expect(screen.getByRole('heading', { name: 'Trending Now' })).toBeInTheDocument()
  })

  it('renders loading state without the coin list', () => {
    render(<TrendingCoins coins={[]} isLoading />)

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.queryByText('No trending coins')).not.toBeInTheDocument()
  })

  it('shows empty state message when coins array is empty', () => {
    render(<TrendingCoins coins={[]} isLoading={false} />)

    expect(screen.getByText('No trending coins')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('renders a list item for each coin', () => {
    render(<TrendingCoins coins={mockCoins} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(mockCoins.length)
  })

  it('renders each coin name and symbol', () => {
    render(<TrendingCoins coins={mockCoins} />)

    expect(screen.getByText('Pepe')).toBeInTheDocument()
    expect(screen.getByText('PEPE')).toBeInTheDocument()
    expect(screen.getByText('Bonk')).toBeInTheDocument()
    expect(screen.getByText('BONK')).toBeInTheDocument()
  })

  it('shows position rank for each coin', () => {
    render(<TrendingCoins coins={mockCoins} />)

    expect(screen.getByText('#1')).toBeInTheDocument()
    expect(screen.getByText('#2')).toBeInTheDocument()
  })

  it('shows market cap rank for each coin', () => {
    render(<TrendingCoins coins={mockCoins} />)

    expect(screen.getByText('Rank #45')).toBeInTheDocument()
    expect(screen.getByText('Rank #67')).toBeInTheDocument()
  })
})

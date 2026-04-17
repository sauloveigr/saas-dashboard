import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { DollarSign } from 'lucide-react'
import type { Metric } from '@/types/dashboard'

const baseMetric: Metric = {
  id: 'bitcoin',
  title: 'Bitcoin',
  value: '$67,000',
  change: 1.86,
  icon: DollarSign,
}

describe('MetricCard', () => {
  it('renders title and value', () => {
    render(<MetricCard metric={baseMetric} />)

    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('$67,000')).toBeInTheDocument()
  })

  it('shows absolute percentage change', () => {
    render(<MetricCard metric={baseMetric} />)

    expect(screen.getByText('1.86%')).toBeInTheDocument()
  })

  it('shows absolute value for negative change', () => {
    render(<MetricCard metric={{ ...baseMetric, change: -3.2 }} />)

    expect(screen.getByText('3.2%')).toBeInTheDocument()
  })

  it('renders as an article element', () => {
    const { container } = render(<MetricCard metric={baseMetric} />)

    expect(container.querySelector('article')).toBeInTheDocument()
  })

  it('renders numeric value correctly', () => {
    render(<MetricCard metric={{ ...baseMetric, value: 42 }} />)

    expect(screen.getByText('42')).toBeInTheDocument()
  })
})

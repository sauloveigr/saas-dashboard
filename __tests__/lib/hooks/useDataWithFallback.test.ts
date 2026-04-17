import { describe, it, expect } from 'vitest'
import { useDataWithFallback } from '@/lib/hooks/useDataWithFallback'
import type { UseQueryResult } from '@tanstack/react-query'

function fakeQuery<T>(overrides: Partial<UseQueryResult<T, Error>>): UseQueryResult<T, Error> {
  return {
    data: undefined,
    isLoading: false,
    error: null,
    ...overrides,
  } as UseQueryResult<T, Error>
}

describe('useDataWithFallback', () => {
  it('passes through data, isLoading, and error from query result', () => {
    const data = [{ id: 'bitcoin' }]
    const error = new Error('API failed')
    const result = useDataWithFallback(fakeQuery({ data, isLoading: false, error }))

    expect(result.data).toEqual(data)
    expect(result.isLoading).toBe(false)
    expect(result.error).toBe(error)
  })

  it('isEmpty is true when data is undefined', () => {
    expect(useDataWithFallback(fakeQuery({ data: undefined })).isEmpty).toBe(true)
  })

  it('isEmpty is true when data is an empty array', () => {
    expect(useDataWithFallback(fakeQuery({ data: [] as never })).isEmpty).toBe(true)
  })

  it('isEmpty is false when data is a non-empty array', () => {
    expect(useDataWithFallback(fakeQuery({ data: [1] as never })).isEmpty).toBe(false)
  })

  it('uses custom isEmptyCheck when provided', () => {
    const data = { items: [] as number[] }
    const result = useDataWithFallback(fakeQuery({ data }), (d) => d.items.length === 0)

    expect(result.isEmpty).toBe(true)
  })

  it('isEmpty is false when custom isEmptyCheck returns false', () => {
    const data = { items: [1, 2] }
    const result = useDataWithFallback(fakeQuery({ data }), (d) => d.items.length === 0)

    expect(result.isEmpty).toBe(false)
  })

  it('isEmpty is true for non-array data without a custom check', () => {
    const result = useDataWithFallback(fakeQuery({ data: { count: 0 } as never }))

    expect(result.isEmpty).toBe(false)
  })
})

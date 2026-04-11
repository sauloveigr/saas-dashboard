import type {
  CryptoMarketData,
  CryptoChartData,
  GlobalMarketData,
  TrendingResponse,
} from "@/types/crypto";
import {
  getMockMarketData,
  getMockChartData,
  getMockGlobalData,
  getMockTrendingCoins,
} from "@/lib/mocks/crypto-mock-data";
import {
  shouldFallbackOnError,
  shouldFallbackOnTimeout,
  getTimeoutMs,
  logMockFallback,
} from "@/lib/mocks/mock-config";

/**
 * Data provider service with automatic fallback to mock data
 * ALWAYS tries API first, only uses mock data when API fails
 * This ensures the dashboard never breaks due to API failures
 */

export class DataProviderError extends Error {
  constructor(
    message: string,
    public readonly usedFallback: boolean = false,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = "DataProviderError";
  }
}

async function fetchWithTimeout<T>(
  fetchFn: () => Promise<T>,
  timeoutMs: number
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("API request timeout")), timeoutMs);
  });

  return Promise.race([fetchFn(), timeoutPromise]);
}

async function executeWithFallback<T>(
  apiFn: () => Promise<T>,
  fallbackFn: () => T,
  operationName: string
): Promise<T> {
  try {
    if (shouldFallbackOnTimeout()) {
      return await fetchWithTimeout(apiFn, getTimeoutMs());
    }
    return await apiFn();
  } catch (error) {
    if (shouldFallbackOnError()) {
      logMockFallback(
        `API failed for ${operationName}, falling back to mock data`,
        error
      );
      return fallbackFn();
    }
    throw new DataProviderError(
      `Failed to fetch ${operationName} and fallback is disabled`,
      false,
      error
    );
  }
}

export interface GetMarketsParams {
  vs_currency?: string;
  ids?: string[];
  order?: string;
  per_page?: number;
  page?: number;
}

export interface GetMarketChartParams {
  vs_currency?: string;
  days: string;
  interval?: string;
}

/**
 * Provides market data with automatic fallback
 * Flow: API call → Success (return data) → Error (return mock data)
 */
export async function provideMarketData(
  apiFn: () => Promise<CryptoMarketData[]>,
  params?: GetMarketsParams
): Promise<CryptoMarketData[]> {
  return executeWithFallback(
    apiFn,
    () =>
      getMockMarketData({
        ids: params?.ids,
        per_page: params?.per_page,
      }),
    "market data"
  );
}

/**
 * Provides chart data with automatic fallback
 * Flow: API call → Success (return data) → Error (return mock data)
 */
export async function provideChartData(
  apiFn: () => Promise<CryptoChartData>,
  coinId: string
): Promise<CryptoChartData> {
  return executeWithFallback(apiFn, () => getMockChartData(coinId), `chart data for ${coinId}`);
}

/**
 * Provides global market data with automatic fallback
 * Flow: API call → Success (return data) → Error (return mock data)
 */
export async function provideGlobalData(
  apiFn: () => Promise<GlobalMarketData>
): Promise<GlobalMarketData> {
  return executeWithFallback(apiFn, getMockGlobalData, "global market data");
}

/**
 * Provides trending coins data with automatic fallback
 * Flow: API call → Success (return data) → Error (return mock data)
 */
export async function provideTrendingData(
  apiFn: () => Promise<TrendingResponse>
): Promise<TrendingResponse> {
  return executeWithFallback(apiFn, getMockTrendingCoins, "trending coins data");
}

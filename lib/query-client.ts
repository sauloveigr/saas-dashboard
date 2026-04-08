import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { ApiError } from "./api/client";

function handleError(error: unknown) {
  if (error instanceof ApiError) {
    console.error(`API Error [${error.status}]:`, error.message);
  } else if (error instanceof Error) {
    console.error("Error:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status === 429) {
          return false;
        }
        return failureCount < 1;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
});

export const QUERY_KEYS = {
  CRYPTO: {
    all: ["crypto"] as const,
    markets: () => [...QUERY_KEYS.CRYPTO.all, "markets"] as const,
    topCryptos: () => [...QUERY_KEYS.CRYPTO.markets(), "top"] as const,
    topByMarketCap: (limit: number) =>
      [...QUERY_KEYS.CRYPTO.markets(), "top-market-cap", limit] as const,
    chart: (id: string, days: string) =>
      [...QUERY_KEYS.CRYPTO.all, "chart", id, days] as const,
    global: () => [...QUERY_KEYS.CRYPTO.all, "global"] as const,
    volume: () => [...QUERY_KEYS.CRYPTO.all, "volume"] as const,
    trending: () => [...QUERY_KEYS.CRYPTO.all, "trending"] as const,
    movers: () => [...QUERY_KEYS.CRYPTO.all, "movers"] as const,
  },
} as const;

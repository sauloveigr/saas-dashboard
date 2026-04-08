import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { QUERY_KEYS } from "@/lib/query-client";
import {
  getTopCryptos,
  getTopCryptosByMarketCap,
  getTrendingCoins,
  getMarketChart,
  getGlobalMarketData,
} from "@/lib/api/coingecko";

export function usePrefetchDashboard() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.CRYPTO.topCryptos(),
      queryFn: getTopCryptos,
    });

    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.CRYPTO.topByMarketCap(5),
      queryFn: () => getTopCryptosByMarketCap(5),
    });

    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.CRYPTO.trending(),
      queryFn: getTrendingCoins,
    });

    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.CRYPTO.chart("bitcoin", "7"),
      queryFn: () => getMarketChart("bitcoin", { days: "7" }),
    });
  }, [queryClient]);
}

export function usePrefetchAnalytics() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.CRYPTO.global(),
      queryFn: getGlobalMarketData,
    });

    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.CRYPTO.topByMarketCap(5),
      queryFn: () => getTopCryptosByMarketCap(5),
    });
  }, [queryClient]);
}

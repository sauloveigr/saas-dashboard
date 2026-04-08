import { useQuery } from "@tanstack/react-query";
import {
  getTopCryptos,
  getTopCryptosByMarketCap,
  getMarketChart,
  getGlobalMarketData,
  getTopCryptosByVolume,
  getTrendingCoins,
  getTopGainersLosers,
} from "@/lib/api/coingecko";
import { QUERY_KEYS } from "@/lib/query-client";
import type { 
  TimeRange, 
  FormattedChartData, 
  MarketShareData, 
  VolumeData,
  TrendingCoin,
  PriceChange,
} from "@/types/crypto";

export function useTopCryptos() {
  return useQuery({
    queryKey: QUERY_KEYS.CRYPTO.topCryptos(),
    queryFn: getTopCryptos,
    staleTime: 5 * 60 * 1000,
    refetchInterval: false,
  });
}

export function useTopCryptosByMarketCap(limit: number = 5) {
  return useQuery({
    queryKey: QUERY_KEYS.CRYPTO.topByMarketCap(limit),
    queryFn: () => getTopCryptosByMarketCap(limit),
    staleTime: 5 * 60 * 1000,
    refetchInterval: false,
  });
}

export function useCryptoChart(coinId: string, days: TimeRange = "7") {
  return useQuery({
    queryKey: QUERY_KEYS.CRYPTO.chart(coinId, days),
    queryFn: () => getMarketChart(coinId, { days }),
    staleTime: 10 * 60 * 1000,
    refetchInterval: false,
    select: (data): FormattedChartData[] => {
      return data.prices.map(([timestamp, price], index) => ({
        timestamp,
        date: new Date(timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price,
        previousPrice:
          index > 0 ? data.prices[index - 1][1] : undefined,
      }));
    },
  });
}

export function useGlobalMarketData() {
  return useQuery({
    queryKey: QUERY_KEYS.CRYPTO.global(),
    queryFn: getGlobalMarketData,
    staleTime: 10 * 60 * 1000,
    refetchInterval: false,
  });
}

export function useMarketShareData() {
  return useQuery({
    queryKey: QUERY_KEYS.CRYPTO.topByMarketCap(5),
    queryFn: () => getTopCryptosByMarketCap(5),
    staleTime: 10 * 60 * 1000,
    refetchInterval: false,
    select: (data): MarketShareData[] => {
      const totalMarketCap = data.reduce((sum, crypto) => sum + crypto.market_cap, 0);
      const colors = [
        "hsl(217, 91%, 60%)",
        "hsl(142, 71%, 45%)",
        "hsl(262, 83%, 58%)",
        "hsl(25, 95%, 53%)",
        "hsl(340, 82%, 52%)",
      ];
      
      return data.map((crypto, index) => ({
        name: crypto.name,
        value: Number(((crypto.market_cap / totalMarketCap) * 100).toFixed(2)),
        color: colors[index],
      }));
    },
  });
}

export function useVolumeData() {
  return useQuery({
    queryKey: QUERY_KEYS.CRYPTO.volume(),
    queryFn: () => getTopCryptosByVolume(6),
    staleTime: 10 * 60 * 1000,
    refetchInterval: false,
    select: (data): VolumeData[] => {
      return data.map((crypto) => ({
        name: crypto.symbol.toUpperCase(),
        volume: crypto.total_volume,
      }));
    },
  });
}

export function useTrendingCoins() {
  return useQuery({
    queryKey: QUERY_KEYS.CRYPTO.trending(),
    queryFn: getTrendingCoins,
    staleTime: 15 * 60 * 1000,
    refetchInterval: false,
    select: (data): TrendingCoin[] => {
      return data.coins.slice(0, 7).map((coin) => coin.item);
    },
  });
}

export function useMarketMovers() {
  return useQuery({
    queryKey: QUERY_KEYS.CRYPTO.movers(),
    queryFn: getTopGainersLosers,
    staleTime: 10 * 60 * 1000,
    refetchInterval: false,
    select: (data): PriceChange[] => {
      return data.slice(0, 5).map((crypto) => ({
        id: crypto.id,
        symbol: crypto.symbol.toUpperCase(),
        name: crypto.name,
        image: crypto.image,
        current_price: crypto.current_price,
        price_change_percentage_24h: crypto.price_change_percentage_24h,
        price_change_24h: crypto.price_change_24h,
        market_cap_rank: crypto.market_cap_rank,
      }));
    },
  });
}

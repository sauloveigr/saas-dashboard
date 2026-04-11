import { apiClient, API_ENDPOINTS } from "./client";
import type {
  CryptoMarketData,
  CryptoChartData,
  TimeRange,
  GlobalMarketData,
} from "@/types/crypto";
import {
  provideMarketData,
  provideChartData,
  provideGlobalData,
  provideTrendingData,
} from "@/lib/services/crypto-data-provider";

export interface GetMarketsParams {
  vs_currency?: string;
  ids?: string[];
  order?: string;
  per_page?: number;
  page?: number;
}

export interface GetMarketChartParams {
  vs_currency?: string;
  days: TimeRange;
  interval?: string;
}

export async function getMarkets(
  params: GetMarketsParams = {}
): Promise<CryptoMarketData[]> {
  const {
    vs_currency = "usd",
    ids,
    order = "market_cap_desc",
    per_page = 10,
    page = 1,
  } = params;

  const queryParams = new URLSearchParams({
    vs_currency,
    order,
    per_page: per_page.toString(),
    page: page.toString(),
  });

  if (ids && ids.length > 0) {
    queryParams.append("ids", ids.join(","));
  }

  return provideMarketData(
    () =>
      apiClient<CryptoMarketData[]>(
        `${API_ENDPOINTS.MARKETS}?${queryParams.toString()}`
      ),
    params
  );
}

export async function getMarketChart(
  coinId: string,
  params: GetMarketChartParams = { days: "7" }
): Promise<CryptoChartData> {
  const { vs_currency = "usd", days, interval } = params;

  const queryParams = new URLSearchParams({
    vs_currency,
    days,
  });

  if (interval) {
    queryParams.append("interval", interval);
  }

  return provideChartData(
    () =>
      apiClient<CryptoChartData>(
        `${API_ENDPOINTS.MARKET_CHART(coinId)}?${queryParams.toString()}`
      ),
    coinId
  );
}

export async function getTopCryptos(): Promise<CryptoMarketData[]> {
  return getMarkets({
    ids: ["bitcoin", "ethereum", "binancecoin", "solana"],
    per_page: 4,
  });
}

export async function getTopCryptosByMarketCap(
  limit: number = 5
): Promise<CryptoMarketData[]> {
  return getMarkets({
    order: "market_cap_desc",
    per_page: limit,
  });
}

export async function getGlobalMarketData(): Promise<GlobalMarketData> {
  return provideGlobalData(() => apiClient<GlobalMarketData>("/global"));
}

export async function getTopCryptosByVolume(
  limit: number = 6
): Promise<CryptoMarketData[]> {
  return getMarkets({
    order: "volume_desc",
    per_page: limit,
  });
}

export async function getTrendingCoins(): Promise<import("@/types/crypto").TrendingResponse> {
  return provideTrendingData(() =>
    apiClient<import("@/types/crypto").TrendingResponse>("/search/trending")
  );
}

export async function getTopGainersLosers(): Promise<CryptoMarketData[]> {
  return getMarkets({
    order: "price_change_percentage_24h_desc",
    per_page: 10,
  });
}

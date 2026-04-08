"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { LoadingSpinner, ErrorMessage } from "@/components/ui";
import { 
  useTopCryptos, 
  useCryptoChart, 
  useTopCryptosByMarketCap,
  useTrendingCoins,
  useMarketMovers,
} from "@/hooks/useCryptoData";
import { useDashboardStore } from "@/stores/dashboardStore";
import { DollarSign, TrendingUp, Activity, Users } from "lucide-react";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

const RevenueChart = dynamic(
  () => import("@/components/dashboard/RevenueChart").then((mod) => ({ default: mod.RevenueChart })),
  {
    loading: () => (
      <div className="flex h-80 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    ),
    ssr: false,
  }
);

const TrendingCoins = dynamic(
  () => import("@/components/dashboard/TrendingCoins").then((mod) => ({ default: mod.TrendingCoins })),
  {
    loading: () => (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

const TopProducts = dynamic(
  () => import("@/components/dashboard/TopProducts").then((mod) => ({ default: mod.TopProducts })),
  {
    loading: () => (
      <div className="flex h-48 items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

const MarketMovers = dynamic(
  () => import("@/components/dashboard/MarketMovers").then((mod) => ({ default: mod.MarketMovers })),
  {
    loading: () => (
      <div className="flex h-48 items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

export default function DashboardPage() {
  const { selectedCrypto, timeRange } = useDashboardStore();
  
  const {
    data: topCryptos,
    isLoading: isLoadingCryptos,
    error: cryptosError,
    refetch: refetchCryptos,
  } = useTopCryptos();

  const {
    data: chartData,
    isLoading: isLoadingChart,
    error: chartError,
    refetch: refetchChart,
  } = useCryptoChart(selectedCrypto, timeRange);

  const {
    data: topCryptosByMarketCap,
    isLoading: isLoadingTopCryptos,
    error: topCryptosError,
    refetch: refetchTopCryptos,
  } = useTopCryptosByMarketCap(5);

  const {
    data: trendingCoins,
    isLoading: isLoadingTrending,
    error: trendingError,
    refetch: refetchTrending,
  } = useTrendingCoins();

  const {
    data: marketMovers,
    isLoading: isLoadingMovers,
    error: moversError,
    refetch: refetchMovers,
  } = useMarketMovers();

  const cryptoMetrics = topCryptos
    ? topCryptos.map((crypto) => ({
        id: crypto.id,
        title: crypto.name,
        value: formatCurrency(crypto.current_price),
        change: crypto.price_change_percentage_24h,
        icon:
          crypto.id === "bitcoin"
            ? DollarSign
            : crypto.id === "ethereum"
            ? TrendingUp
            : crypto.id === "binancecoin"
            ? Activity
            : Users,
      }))
    : [];

  const topProducts = topCryptosByMarketCap
    ? topCryptosByMarketCap.map((crypto) => ({
        id: crypto.id,
        name: crypto.name,
        sales: `${formatCompactNumber(crypto.total_volume)} Vol`,
        revenue: formatCurrency(crypto.current_price),
      }))
    : [];

  if (isLoadingCryptos || isLoadingChart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Crypto Dashboard</h1>
        <p className="text-xs text-muted-foreground">
          Real-time cryptocurrency market data powered by CoinGecko API.
        </p>
      </header>

      {cryptosError ? (
        <ErrorMessage
          message="Unable to load cryptocurrency data"
          onRetry={refetchCryptos}
        />
      ) : (
        <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cryptoMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      )}

      {chartError ? (
        <ErrorMessage
          message="Unable to load price chart data"
          onRetry={refetchChart}
        />
      ) : (
        <div className="grid w-full gap-4 grid-cols-1 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <Suspense fallback={<LoadingSpinner size="lg" />}>
              <RevenueChart data={chartData || []} isLoading={isLoadingChart} />
            </Suspense>
          </div>
          <div className="lg:col-span-3">
            {trendingError ? (
              <ErrorMessage
                message="Unable to load trending coins"
                onRetry={refetchTrending}
              />
            ) : (
              <Suspense fallback={<LoadingSpinner />}>
                <TrendingCoins coins={trendingCoins || []} isLoading={isLoadingTrending} />
              </Suspense>
            )}
          </div>
        </div>
      )}

      <div className="grid w-full gap-4 grid-cols-1 lg:grid-cols-2">
        {topCryptosError ? (
          <ErrorMessage
            message="Unable to load top cryptocurrencies"
            onRetry={refetchTopCryptos}
          />
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <TopProducts products={topProducts} isLoading={isLoadingTopCryptos} />
          </Suspense>
        )}
        
        {moversError ? (
          <ErrorMessage
            message="Unable to load market movers"
            onRetry={refetchMovers}
          />
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <MarketMovers movers={marketMovers || []} isLoading={isLoadingMovers} />
          </Suspense>
        )}
      </div>
    </div>
  );
}

"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { FormattedChartData } from "@/types/crypto";
import { Card, LoadingSpinner } from "@/components/ui";

interface RevenueChartProps {
  data: FormattedChartData[];
  isLoading?: boolean;
}

export function RevenueChart({ data, isLoading }: RevenueChartProps) {
  return (
    <Card as="section" className="h-full flex flex-col">
      <header className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base font-semibold">Price History</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Daily price movements over selected period
          </p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-foreground" />
            <span className="text-muted-foreground">Current</span>
          </div>
        </div>
      </header>
      
      <div className="flex-1 min-h-[320px]">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 0%, 9%)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(0, 0%, 9%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(0, 0%, 45%)", fontSize: 11 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(0, 0%, 45%)", fontSize: 11 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-border bg-background p-3 shadow-lg">
                        <p className="mb-2 text-xs font-medium text-muted-foreground">
                          {payload[0].payload.date}
                        </p>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-muted-foreground">Price</span>
                          <span className="text-xs font-semibold">
                            ${payload[0].value?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="hsl(0, 0%, 9%)"
                strokeWidth={2}
                fill="url(#colorPrice)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

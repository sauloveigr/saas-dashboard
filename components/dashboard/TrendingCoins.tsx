import { TrendingUp, Flame } from "lucide-react";
import type { TrendingCoin } from "@/types/crypto";
import { Card, LoadingSpinner } from "@/components/ui";

interface TrendingCoinsProps {
  coins: TrendingCoin[];
  isLoading?: boolean;
}

export function TrendingCoins({ coins, isLoading }: TrendingCoinsProps) {
  const getColor = (rank: number) => {
    if (rank <= 3) return "bg-orange-500";
    if (rank <= 5) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <Card as="section" className="h-full flex flex-col">
      <header className="mb-4 flex items-center gap-2">
        <Flame className="h-4 w-4 text-orange-500" />
        <h2 className="text-base font-semibold">Trending Now</h2>
      </header>
      
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : coins.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">No trending coins</p>
        </div>
      ) : (
        <ul className="flex-1 space-y-4 overflow-y-auto">
          {coins.map((coin, index) => (
            <li key={coin.id} className="flex items-start gap-3">
              <div className="flex items-center gap-2">
                <div className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${getColor(index + 1)}`} />
                <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium">{coin.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {coin.symbol.toUpperCase()}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Rank #{coin.market_cap_rank}
                  </span>
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

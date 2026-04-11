import type {
  CryptoMarketData,
  CryptoChartData,
  GlobalMarketData,
  TrendingResponse,
} from "@/types/crypto";

/**
 * Mock data for cryptocurrency market data
 * This provides fallback data when API endpoints fail
 */

export const mockCryptoMarketData: CryptoMarketData[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 67543.21,
    market_cap: 1326789543210,
    market_cap_rank: 1,
    fully_diluted_valuation: 1419876543210,
    total_volume: 28934567890,
    high_24h: 68234.56,
    low_24h: 66543.21,
    price_change_24h: 1234.56,
    price_change_percentage_24h: 1.86,
    market_cap_change_24h: 24567890123,
    market_cap_change_percentage_24h: 1.89,
    circulating_supply: 19654321,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69045,
    ath_change_percentage: -2.18,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 67.81,
    atl_change_percentage: 99456.78,
    atl_date: "2013-07-06T00:00:00.000Z",
    last_updated: new Date().toISOString(),
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3245.67,
    market_cap: 389876543210,
    market_cap_rank: 2,
    fully_diluted_valuation: null,
    total_volume: 15678901234,
    high_24h: 3289.45,
    low_24h: 3198.76,
    price_change_24h: 87.54,
    price_change_percentage_24h: 2.77,
    market_cap_change_24h: 10543219876,
    market_cap_change_percentage_24h: 2.78,
    circulating_supply: 120123456,
    total_supply: 120123456,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -33.46,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 749789.23,
    atl_date: "2015-10-20T00:00:00.000Z",
    last_updated: new Date().toISOString(),
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    current_price: 589.23,
    market_cap: 87654321098,
    market_cap_rank: 3,
    fully_diluted_valuation: 88765432109,
    total_volume: 1234567890,
    high_24h: 595.67,
    low_24h: 582.34,
    price_change_24h: 12.34,
    price_change_percentage_24h: 2.14,
    market_cap_change_24h: 1876543210,
    market_cap_change_percentage_24h: 2.19,
    circulating_supply: 148765432,
    total_supply: 148765432,
    max_supply: 200000000,
    ath: 686.31,
    ath_change_percentage: -14.14,
    ath_date: "2021-05-10T07:24:17.097Z",
    atl: 0.0398177,
    atl_change_percentage: 1479234.56,
    atl_date: "2017-10-19T00:00:00.000Z",
    last_updated: new Date().toISOString(),
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 142.56,
    market_cap: 64321098765,
    market_cap_rank: 4,
    fully_diluted_valuation: 78901234567,
    total_volume: 3456789012,
    high_24h: 145.67,
    low_24h: 139.23,
    price_change_24h: 4.56,
    price_change_percentage_24h: 3.30,
    market_cap_change_24h: 2098765432,
    market_cap_change_percentage_24h: 3.36,
    circulating_supply: 451234567,
    total_supply: 553876543,
    max_supply: null,
    ath: 259.96,
    ath_change_percentage: -45.14,
    ath_date: "2021-11-06T21:54:35.825Z",
    atl: 0.500801,
    atl_change_percentage: 28359.78,
    atl_date: "2020-05-11T19:35:23.449Z",
    last_updated: new Date().toISOString(),
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.456789,
    market_cap: 16098765432,
    market_cap_rank: 5,
    fully_diluted_valuation: 20543219876,
    total_volume: 543219876,
    high_24h: 0.467890,
    low_24h: 0.445678,
    price_change_24h: 0.012345,
    price_change_percentage_24h: 2.77,
    market_cap_change_24h: 432198765,
    market_cap_change_percentage_24h: 2.76,
    circulating_supply: 35234567890,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -85.21,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01925275,
    atl_change_percentage: 2271.34,
    atl_date: "2020-03-13T02:22:55.044Z",
    last_updated: new Date().toISOString(),
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 0.523456,
    market_cap: 28765432109,
    market_cap_rank: 6,
    fully_diluted_valuation: 52345678901,
    total_volume: 1987654321,
    high_24h: 0.534567,
    low_24h: 0.512345,
    price_change_24h: 0.015432,
    price_change_percentage_24h: 3.04,
    market_cap_change_24h: 876543210,
    market_cap_change_percentage_24h: 3.14,
    circulating_supply: 54987654321,
    total_supply: 99987654321,
    max_supply: 100000000000,
    ath: 3.84,
    ath_change_percentage: -86.37,
    ath_date: "2018-01-07T00:00:00.000Z",
    atl: 0.00268621,
    atl_change_percentage: 19389.45,
    atl_date: "2014-05-22T00:00:00.000Z",
    last_updated: new Date().toISOString(),
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    current_price: 0.087654,
    market_cap: 12543219876,
    market_cap_rank: 7,
    fully_diluted_valuation: null,
    total_volume: 987654321,
    high_24h: 0.089876,
    low_24h: 0.085432,
    price_change_24h: 0.003210,
    price_change_percentage_24h: 3.80,
    market_cap_change_24h: 476543210,
    market_cap_change_percentage_24h: 3.95,
    circulating_supply: 143098765432,
    total_supply: 143098765432,
    max_supply: null,
    ath: 0.731578,
    ath_change_percentage: -88.01,
    ath_date: "2021-05-08T05:08:23.458Z",
    atl: 0.0000869,
    atl_change_percentage: 100789.23,
    atl_date: "2015-05-06T00:00:00.000Z",
    last_updated: new Date().toISOString(),
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    current_price: 6.789012,
    market_cap: 8765432109,
    market_cap_rank: 8,
    fully_diluted_valuation: 9876543210,
    total_volume: 234567890,
    high_24h: 6.912345,
    low_24h: 6.654321,
    price_change_24h: 0.198765,
    price_change_percentage_24h: 3.01,
    market_cap_change_24h: 263456789,
    market_cap_change_percentage_24h: 3.10,
    circulating_supply: 1291234567,
    total_supply: 1454321098,
    max_supply: null,
    ath: 54.98,
    ath_change_percentage: -87.65,
    ath_date: "2021-11-04T14:10:09.301Z",
    atl: 2.70,
    atl_change_percentage: 151.45,
    atl_date: "2020-08-20T05:48:11.359Z",
    last_updated: new Date().toISOString(),
  },
  {
    id: "avalanche-2",
    symbol: "avax",
    name: "Avalanche",
    image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    current_price: 34.567890,
    market_cap: 13456789012,
    market_cap_rank: 9,
    fully_diluted_valuation: 15678901234,
    total_volume: 456789012,
    high_24h: 35.432109,
    low_24h: 33.765432,
    price_change_24h: 1.098765,
    price_change_percentage_24h: 3.28,
    market_cap_change_24h: 428765432,
    market_cap_change_percentage_24h: 3.29,
    circulating_supply: 389234567,
    total_supply: 453678901,
    max_supply: 720000000,
    ath: 144.96,
    ath_change_percentage: -76.15,
    ath_date: "2021-11-21T14:18:56.538Z",
    atl: 2.79,
    atl_change_percentage: 1138.78,
    atl_date: "2020-12-31T13:15:21.540Z",
    last_updated: new Date().toISOString(),
  },
  {
    id: "tron",
    symbol: "trx",
    name: "TRON",
    image: "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png",
    current_price: 0.123456,
    market_cap: 10876543210,
    market_cap_rank: 10,
    fully_diluted_valuation: 11098765432,
    total_volume: 345678901,
    high_24h: 0.126789,
    low_24h: 0.120123,
    price_change_24h: 0.004567,
    price_change_percentage_24h: 3.84,
    market_cap_change_24h: 403219876,
    market_cap_change_percentage_24h: 3.85,
    circulating_supply: 88098765432,
    total_supply: 89876543210,
    max_supply: null,
    ath: 0.231673,
    ath_change_percentage: -46.70,
    ath_date: "2018-01-05T00:00:00.000Z",
    atl: 0.00180434,
    atl_change_percentage: 6742.89,
    atl_date: "2017-11-12T00:00:00.000Z",
    last_updated: new Date().toISOString(),
  },
];

export const mockCryptoChartData: CryptoChartData = {
  prices: Array.from({ length: 168 }, (_, i) => {
    const timestamp = Date.now() - (168 - i) * 60 * 60 * 1000;
    const basePrice = 67543.21;
    const variation = Math.sin(i / 10) * 2000 + Math.random() * 1000;
    return [timestamp, basePrice + variation];
  }),
  market_caps: Array.from({ length: 168 }, (_, i) => {
    const timestamp = Date.now() - (168 - i) * 60 * 60 * 1000;
    const baseMarketCap = 1326789543210;
    const variation = Math.sin(i / 10) * 50000000000 + Math.random() * 20000000000;
    return [timestamp, baseMarketCap + variation];
  }),
  total_volumes: Array.from({ length: 168 }, (_, i) => {
    const timestamp = Date.now() - (168 - i) * 60 * 60 * 1000;
    const baseVolume = 28934567890;
    const variation = Math.sin(i / 10) * 5000000000 + Math.random() * 2000000000;
    return [timestamp, baseVolume + variation];
  }),
};

export const mockGlobalMarketData: GlobalMarketData = {
  data: {
    active_cryptocurrencies: 12847,
    markets: 987,
    total_market_cap: {
      usd: 2456789012345,
    },
    total_volume: {
      usd: 123456789012,
    },
    market_cap_percentage: {
      btc: 54.2,
      eth: 15.8,
    },
    market_cap_change_percentage_24h_usd: 2.34,
    updated_at: Math.floor(Date.now() / 1000),
  },
};

export const mockTrendingCoins: TrendingResponse = {
  coins: [
    {
      item: {
        id: "pepe",
        name: "Pepe",
        symbol: "PEPE",
        market_cap_rank: 45,
        price_btc: 0.000000012345,
        thumb: "https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg",
        score: 0,
      },
    },
    {
      item: {
        id: "bonk",
        name: "Bonk",
        symbol: "BONK",
        market_cap_rank: 67,
        price_btc: 0.000000023456,
        thumb: "https://assets.coingecko.com/coins/images/28600/small/bonk.jpg",
        score: 1,
      },
    },
    {
      item: {
        id: "floki",
        name: "FLOKI",
        symbol: "FLOKI",
        market_cap_rank: 78,
        price_btc: 0.000000034567,
        thumb: "https://assets.coingecko.com/coins/images/16746/small/PNG_image.png",
        score: 2,
      },
    },
    {
      item: {
        id: "shiba-inu",
        name: "Shiba Inu",
        symbol: "SHIB",
        market_cap_rank: 11,
        price_btc: 0.000000045678,
        thumb: "https://assets.coingecko.com/coins/images/11939/small/shiba.png",
        score: 3,
      },
    },
    {
      item: {
        id: "injective-protocol",
        name: "Injective",
        symbol: "INJ",
        market_cap_rank: 34,
        price_btc: 0.00045678,
        thumb: "https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png",
        score: 4,
      },
    },
    {
      item: {
        id: "render-token",
        name: "Render",
        symbol: "RNDR",
        market_cap_rank: 29,
        price_btc: 0.00012345,
        thumb: "https://assets.coingecko.com/coins/images/11636/small/rndr.png",
        score: 5,
      },
    },
    {
      item: {
        id: "sei-network",
        name: "Sei",
        symbol: "SEI",
        market_cap_rank: 56,
        price_btc: 0.000067890,
        thumb: "https://assets.coingecko.com/coins/images/28205/small/sei.png",
        score: 6,
      },
    },
  ],
};

export function getMockMarketData(params?: {
  ids?: string[];
  per_page?: number;
}): CryptoMarketData[] {
  let data = [...mockCryptoMarketData];
  
  if (params?.ids && params.ids.length > 0) {
    data = data.filter((crypto) => params.ids!.includes(crypto.id));
  }
  
  if (params?.per_page) {
    data = data.slice(0, params.per_page);
  }
  
  return data;
}

export function getMockChartData(coinId: string): CryptoChartData {
  return mockCryptoChartData;
}

export function getMockGlobalData(): GlobalMarketData {
  return mockGlobalMarketData;
}

export function getMockTrendingCoins(): TrendingResponse {
  return mockTrendingCoins;
}

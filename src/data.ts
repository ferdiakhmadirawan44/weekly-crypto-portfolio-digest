// ---------------------------------------------------------------------------
// Sample data for "The Ledger" — Weekly Crypto Portfolio Digest.
// All figures are INVENTED sample data (week of 10–16 November 2026) so the
// template renders and reads like a real digest. A sender would replace this
// object with live portfolio data; the template itself takes `data` as a prop.
// ---------------------------------------------------------------------------

export interface Holding {
  symbol: string;
  name: string;
  /** Accent color used for the symbol and its allocation bar. */
  color: string;
  price: string;
  change24h: number; // percent, e.g. 2.31 or -1.42
  value: string;
  share: number; // percent of portfolio, e.g. 42.3
}

export interface Mover {
  kind: "gainer" | "loser";
  symbol: string;
  name: string;
  changeWeek: number; // percent over the week
  price: string;
  reason: string;
  weekRange: string;
}

export interface MarketStat {
  label: string;
  value: string;
  note: string;
  /** "up" | "down" | "neutral" — drives the note's color. */
  trend: "up" | "down" | "neutral";
}

export interface DigestData {
  issue: number;
  weekLabel: string;
  weekDates: string;
  /** Portfolio totals. */
  totalValue: string;
  totalChangeWeek: string; // e.g. "+$1,942.10"
  totalChangeWeekPct: number;
  change24hPct: number;
  change24hValue: string;
  change7dPct: number;
  marketChange7dPct: number;
  holdings: Holding[];
  movers: Mover[];
  market: MarketStat[];
  insight: string;
  watchList: string[];
}

export const sampleData: DigestData = {
  issue: 47,
  weekLabel: "Week 46",
  weekDates: "10–16 November 2026",
  totalValue: "$48,290.15",
  totalChangeWeek: "+$1,942.10",
  totalChangeWeekPct: 4.19,
  change24hPct: 1.24,
  change24hValue: "+$591.30",
  change7dPct: 4.19,
  marketChange7dPct: 2.1,
  holdings: [
    { symbol: "BTC", name: "Bitcoin", color: "#F7931A", price: "$98,240.00", change24h: 2.31, value: "$20,415.60", share: 42.3 },
    { symbol: "ETH", name: "Ethereum", color: "#627EEA", price: "$3,412.80", change24h: 1.08, value: "$11,286.40", share: 23.4 },
    { symbol: "SOL", name: "Solana", color: "#9945FF", price: "$214.60", change24h: 6.84, value: "$7,724.80", share: 16.0 },
    { symbol: "LINK", name: "Chainlink", color: "#2A5ADA", price: "$24.18", change24h: -1.42, value: "$3,864.20", share: 8.0 },
    { symbol: "ARB", name: "Arbitrum", color: "#28A0F0", price: "$0.8421", change24h: -3.15, value: "$2,898.55", share: 6.0 },
    { symbol: "USDC", name: "USD Coin", color: "#2775CA", price: "$1.00", change24h: 0, value: "$2,100.60", share: 4.3 },
  ],
  movers: [
    {
      kind: "gainer",
      symbol: "SOL",
      name: "Solana",
      changeWeek: 18.4,
      price: "$214.60",
      reason:
        "ETF inflows and a record week for on-chain activity pushed SOL to its highest close since March.",
      weekRange: "Week range $181.20 – $219.40",
    },
    {
      kind: "loser",
      symbol: "ARB",
      name: "Arbitrum",
      changeWeek: -6.2,
      price: "$0.8421",
      reason:
        "Profit-taking after the gaming incentive vote stalled; ARB gave back last week's gains and slipped under $0.85.",
      weekRange: "Week range $0.81 – $0.93",
    },
  ],
  market: [
    { label: "Total market cap", value: "$3.42T", note: "▲ 2.1% this week", trend: "up" },
    { label: "BTC dominance", value: "58.4%", note: "▲ 0.6 pts", trend: "up" },
    { label: "Fear & Greed", value: "72 · Greed", note: "Up from 61 (Greed)", trend: "neutral" },
    { label: "ETH gas", value: "12 Gwei", note: "▼ Low — cheap to move", trend: "up" },
  ],
  insight:
    "Bitcoin reclaimed $98,000 and held it, and that set the tone for everything else. Ethereum quietly kept paying its stakers while Solana stole the show on ETF flows, and the only red ink in your portfolio came from Arbitrum — small, and small enough to ignore. Nothing in this week's tape says “sell”. The tape says “stay seated”.",
  watchList: [
    "FOMC minutes land Wednesday — rate-cut odds will move BTC first.",
    "The Solana ETF decision window opens Friday; a delay would cool SOL fast.",
    "Ethereum's next upgrade hits testnet — watch validator chatter, not price.",
  ],
};

/** The data the template renders when no `data` prop is passed. */
export const defaultData = sampleData;

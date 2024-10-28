export type StockSearchItem = {
  stockCode: string;
  tickerSymbol: string;
  companyName: string;
  companyNameEng: string;
  market: string;
};

export type StockItem = {
  stockCode: string;
  tickerSymbol: string;
  companyName: string;
  companyNameEng: string;
  market: string;
  currentPrice: number;
  dailyChange: number;
  dailyChangeRate: number;
  sector: string;
  annualDividend: number;
  annualDividendYield: number;
  dividendMonths: number[];
};

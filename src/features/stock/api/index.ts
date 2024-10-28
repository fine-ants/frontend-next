import { fetcherWithoutCredentials } from "@/api/fetcher";
import { Response } from "@/api/types";
import { StockItem, StockSearchItem } from "./types";

export const postStockSearch = async (query: string) => {
  const res = await fetcherWithoutCredentials.post<Response<StockSearchItem[]>>(
    `/stocks/search`,
    { searchTerm: query }
  );
  return res.data;
};

export const getStockPage = async (tickerSymbol: string) => {
  const res = await fetcherWithoutCredentials.get<Response<StockItem>>(
    `/stocks/${tickerSymbol}`
  );
  return res.data;
};

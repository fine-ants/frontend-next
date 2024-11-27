import { useRouter } from "next/router";

export function usePortfolioId() {
  const { query } = useRouter();
  const portfolioId = query.portfolioId;
  return Array.isArray(portfolioId) ? portfolioId[0] : portfolioId || "";
}

import { clientFetcher } from "@/api/fetcher";
import { Response } from "@/api/types";

export const getAuthStatus = async (cookies?: Record<string, string>) => {
  const res = await clientFetcher.get<Response<boolean>>("/authStatus", {
    cookies,
  });
  return res.data;
};

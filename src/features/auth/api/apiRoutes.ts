import { clientFetcher } from "@/api/fetcher";
import { Response } from "@/api/types";

export const getAuthStatus = async (cookies?: {}) => {
  const res = await clientFetcher.get<Response<boolean>>("/authStatus", {
    cookies,
  });
  return res.data;
};

import { useSuspenseQuery } from "@tanstack/react-query";
import { getAuthStatus } from "../apiRoutes";
import { authKeys } from "./queryKeys";

export default function useAuthStatusQuery(cookies?: Record<string, string>) {
  return useSuspenseQuery({
    queryKey: authKeys.auth.queryKey,
    queryFn: () => getAuthStatus(cookies),
    select: (res) => res.data,
    retry: 0,
    // TODO : 쿠키 만료시간에 맞게 추후에 수정 필요
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });
}

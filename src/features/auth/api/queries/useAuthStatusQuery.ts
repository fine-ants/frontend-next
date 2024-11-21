import { useSuspenseQuery } from "@tanstack/react-query";
import { getAuthStatus } from "../apiRoutes";
import { authKeys } from "./queryKeys";

export default function useAuthStatusQuery(cookies?: Record<string, string>) {
  return useSuspenseQuery({
    queryKey: authKeys.auth.queryKey,
    queryFn: () => getAuthStatus(cookies),
    select: (res) => res.data,
    retry: 0,
    gcTime: 1000 * 60 * 5,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getUser } from "..";
import { userKeys } from "./queryKeys";

export default function useUserQuery(cookies?: Record<string, string>) {
  return useQuery({
    queryKey: userKeys.userInfo.queryKey,
    queryFn: () => getUser(cookies),
    select: (res) => res.data.user,
    retry: 0,
    gcTime: Infinity,
    staleTime: Infinity,
  });
}

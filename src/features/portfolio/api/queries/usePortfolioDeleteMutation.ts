import Routes from "@/constants/Routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { deletePortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioDeleteMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deletePortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.list.queryKey,
      });
      router.push(Routes.PORTFOLIOS);
    },
    meta: {
      toastSuccessMessage: "포트폴리오 삭제를 성공했습니다",
    },
  });
}

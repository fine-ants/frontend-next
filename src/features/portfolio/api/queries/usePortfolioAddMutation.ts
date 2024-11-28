import Routes from "@/constants/Routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";
import { postPortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

type Props = {
  onSuccessCb: () => void;
};

export default function usePortfolioAddMutation({ onSuccessCb }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPortfolio,
    onSuccess: ({ data }) => {
      onSuccessCb();

      queryClient.invalidateQueries({
        queryKey: portfolioKeys.list.queryKey,
      });

      router.push(Routes.PORTFOLIO(data.portfolioId));
    },
    meta: {
      toastSuccessMessage: "포트폴리오 추가를 성공했습니다",
      toastErrorMessage: "포트폴리오 추가를 실패했습니다",
    },
  });
}

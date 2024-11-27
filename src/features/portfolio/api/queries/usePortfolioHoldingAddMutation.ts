import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPortfolioHolding } from "..";
import { portfolioKeys } from "./queryKeys";

type Props = {
  portfolioId: number;
  onClose: () => void;
};

export default function usePortfolioHoldingAddMutation({
  portfolioId,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPortfolioHolding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(portfolioId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.charts(portfolioId).queryKey,
      });
      onClose();
    },
    onError: (error) => {
      //TODO : toast 추가
      // const message = (error as AxiosError<Response<null>>).response?.data
      //   ?.message as string;
      // toast.error(message);
    },
    meta: {
      toastSuccessMessage: "종목이 추가되었습니다",
    },
  });
}

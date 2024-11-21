import Routes from "@/constants/Routes";
import { userKeys } from "@/features/user/api/queries/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postSignOut } from "..";
import { authKeys } from "./queryKeys";

export default function useSignOutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      router.push(Routes.LANDING);
      queryClient.invalidateQueries({
        queryKey: authKeys.authStatus.queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: userKeys.userInfo.queryKey,
      });
    },
    meta: {
      toastErrorMessage: "로그아웃을 다시 시도해주세요",
    },
  });
}

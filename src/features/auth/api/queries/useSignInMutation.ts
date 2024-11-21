import Routes from "@/constants/Routes";
import { userKeys } from "@/features/user/api/queries/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postSignIn } from "../index";
import { authKeys } from "./queryKeys";

export default function useSignInMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignIn,
    onSuccess: async () => {
      try {
        router.push(Routes.DASHBOARD);
        queryClient.invalidateQueries({
          queryKey: authKeys.authStatus.queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: userKeys.userInfo.queryKey,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch user data");
        router.push(Routes.SIGNIN);
      }
    },
    meta: {
      toastErrorMessage: "이메일 또는 비밀번호가 일치하지 않습니다",
    },
  });
}

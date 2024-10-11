import Routes from "@/constants/Routes";
import { UserContext } from "@/features/user/context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { postSignOut } from "..";

export default function useSignOutMutation() {
  const router = useRouter();
  const { onSignOut } = useContext(UserContext);

  return useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      onSignOut();
      router.push(Routes.LANDING);
    },
    meta: {
      toastErrorMessage: "로그아웃을 다시 시도해주세요",
    },
  });
}

import Routes from "@/constants/Routes";
import { getUser } from "@/features/user/api";
import { UserContext } from "@/features/user/context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { postSignIn } from "../index";

export default function useSignInMutation() {
  const router = useRouter();
  const { onSignOut, onGetUser } = useContext(UserContext);

  return useMutation({
    mutationFn: postSignIn,
    onSuccess: async () => {
      try {
        const {
          data: { user },
        } = await getUser();

        onGetUser(user);

        router.push(Routes.DASHBOARD);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch user data");
        onSignOut();
        router.push(Routes.SIGNIN);
      }
    },
    meta: {
      toastErrorMessage: "이메일 또는 비밀번호가 일치하지 않습니다",
    },
  });
}

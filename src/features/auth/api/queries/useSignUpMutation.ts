import Routes from "@/constants/Routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postSignUp } from "..";

export default function useSignUpMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      router.push(Routes.SIGNIN);
    },
    meta: {
      toastSuccessMessage: "회원가입이 완료되었습니다",
      toastErrorMessage: "회원가입에 실패했습니다. 다시 시도해주세요",
    },
  });
}

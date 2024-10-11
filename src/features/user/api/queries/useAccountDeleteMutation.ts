import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { deleteAccount } from "..";
import { UserContext } from "../../context/UserContext";

export default function useAccountDeleteMutation() {
  const { onSignOut } = useContext(UserContext);

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: onSignOut,
    meta: {
      toastErrorMessage: "계정 삭제를 실패했습니다",
    },
  });
}

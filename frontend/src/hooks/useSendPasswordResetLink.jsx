import axios from "axios";
import { BASE_ENDPOINT } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "./useAlert";

const sendPasswordResetLink = (requestBody) => {
  const { data } = axios.post(
    `${BASE_ENDPOINT}/auth/forgot-password`,
    requestBody
  );
  return data;
};

export const useSendPasswordResetLink = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useAlert();
  const PASSWORD_RESET_LINK_QUERY_KEY = "pwResetLink";
  return useMutation({
    mutationFn: (requestBody) => sendPasswordResetLink(requestBody),
    mutationKey: [PASSWORD_RESET_LINK_QUERY_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries(PASSWORD_RESET_LINK_QUERY_KEY);
      handleSuccess("Password reset link succesfully sent!");
    },
    onError: () => {
      handleError("Failed to send password reset link. Please try again.");
    },
  });
};

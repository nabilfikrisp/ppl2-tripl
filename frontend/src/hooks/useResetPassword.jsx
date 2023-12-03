import axios from "axios";
import { BASE_ENDPOINT } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "./useAlert";
import { useNavigate } from "react-router-dom";

const postResetPassword = (requestBody) => {
  const { data } = axios.post(`${BASE_ENDPOINT}/auth/reset`, requestBody);
  return data;
};

export const useResetPassword = ({ redirectOnSuccess = null } = {}) => {
  const RESET_PASSWORD_QUERY_KEY = "resetPassword";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useAlert();

  return useMutation({
    mutationFn: (requestBody) => postResetPassword(requestBody),
    mutationKey: [RESET_PASSWORD_QUERY_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries(RESET_PASSWORD_QUERY_KEY);
      handleSuccess("New password succesfully set, you may now sign in!");
      if (redirectOnSuccess) {
        navigate(redirectOnSuccess);
      }
    },
    onError: () => {
      handleError(
        "Failed to reset password. Please try send reset password link again."
      );
    },
  });
};

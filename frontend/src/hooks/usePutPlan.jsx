import axios from "axios";
import { BASE_ENDPOINT } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "./useAlert";
import { useAuth } from "./useAuth";
import { MY_PLANS_QUERY_KEY } from "./useGetMyPlans";

const putPlan = async ({ planData, token, planId }) => {
  const { data } = await axios.put(
    `${BASE_ENDPOINT}/plans/${planId}`,
    planData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const usePutPlan = (planId) => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useAlert();
  const { user } = useAuth();
  const PUT_PLAN_QUERY_KEY = "editPlan";
  return useMutation({
    mutationFn: (planData) => putPlan({ planData, token: user.token, planId }),
    mutationKey: [PUT_PLAN_QUERY_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries(MY_PLANS_QUERY_KEY);
      handleSuccess("Plan successfully updated!");
    },
    onError: () => {
      handleError("Failed to update plan. Please try again.");
    },
  });
};

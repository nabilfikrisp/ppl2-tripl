import axios from "axios";
import { BASE_ENDPOINT } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "./useAlert";
import { useAuth } from "./useAuth";
import { MY_PLANS_QUERY_KEY } from "./useGetMyPlans";

const deletePlan = async ({ token, planId }) => {
  const { data } = await axios.delete(`${BASE_ENDPOINT}/plans/${planId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useDeletePlan = (planId) => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useAlert();
  const { user } = useAuth();
  const DELETE_PLAN_QUERY_KEY = "editPlan";
  return useMutation({
    mutationFn: () => deletePlan({ token: user.token, planId }),
    mutationKey: [DELETE_PLAN_QUERY_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries(MY_PLANS_QUERY_KEY);
      handleSuccess("Plan successfully deleted");
    },
    onError: () => {
      handleError("Failed to delete plan. Please try again.");
    },
  });
};

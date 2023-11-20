import axios from "axios";
import { BASE_ENDPOINT } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "./useAlert";
import { useAuth } from "./useAuth";

const createPlan = async (planData, token) => {
  const { data } = await axios.post(`${BASE_ENDPOINT}/plans`, planData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const CREATE_PLAN_QUERY_KEY = "createPlan";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useAlert();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (planData) => createPlan(planData, user.token),
    mutationKey: CREATE_PLAN_QUERY_KEY,
    onSuccess: () => {
      queryClient.invalidateQueries("myPlans");
      handleSuccess("Plan successfully saved!");
    },
    onError: () => {
      handleError("Failed to save plan. Please try again.");
    },
  });
};

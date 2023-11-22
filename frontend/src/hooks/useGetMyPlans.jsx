import axios from "axios";
import { BASE_ENDPOINT } from "../api";
import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const getPlan = async (params, token) => {
  const { data } = await axios.get(`${BASE_ENDPOINT}/plans/me`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return data;
};

export const MY_PLANS_QUERY_KEY = "myPlans";

export const useGetMyPlans = (params) => {
  const { user } = useAuth();
  return useQuery({
    queryFn: () => getPlan(params, user.token),
    queryKey: [MY_PLANS_QUERY_KEY],
  });
};

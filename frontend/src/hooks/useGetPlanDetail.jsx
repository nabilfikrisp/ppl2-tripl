import axios from "axios";
import { BASE_ENDPOINT } from "../api";
import { useQuery } from "@tanstack/react-query";

const getPlanDetail = async (id) => {
  const { data } = await axios.get(`${BASE_ENDPOINT}/plans/${id}`, {
    params: { includeLocations: true },
  });
  return data;
};

export const useGetPlanDetail = (id) => {
  const PLAN_DETAIL_QUERY_KEY = "planDetail";
  return useQuery({
    queryFn: () => getPlanDetail(id),
    queryKey: [PLAN_DETAIL_QUERY_KEY, id],
  });
};

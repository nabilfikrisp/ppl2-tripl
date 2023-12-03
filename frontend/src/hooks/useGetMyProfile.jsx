import axios from "axios";
import { BASE_ENDPOINT } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

const fetchMyProfile = async (token) => {
  const { data } = await axios.get(`${BASE_ENDPOINT}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const useGetMyProfile = () => {
  const MY_PROFILE_QUERY_KEY = "myProfile";
  const { user } = useAuth();
  return useQuery({
    queryFn: () => fetchMyProfile(user.token),
    queryKey: [MY_PROFILE_QUERY_KEY],
  });
};

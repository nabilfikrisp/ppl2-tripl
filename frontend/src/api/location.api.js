import axios from "axios";
import { BASE_ENDPOINT } from "./index";

export async function getAllLocations(filterConfig) {
  const { data } = await axios.get(`${BASE_ENDPOINT}locations`, {
    params: filterConfig,
  });
  return data;
}

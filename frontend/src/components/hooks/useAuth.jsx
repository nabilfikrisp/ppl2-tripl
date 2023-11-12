import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

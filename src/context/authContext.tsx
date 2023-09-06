import { LoginData } from "@/interfaces/login.interface";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, createContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValues {
  login: (loginData: LoginData) => void;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const login = async (loginData: LoginData) => {
    try {
      const response = await api.post("sessions", loginData);
      setCookie(null, "tech-hub-token", response.data.token, {
        maxAge: 60 * 30,
        path: "/",
      });
      router.push("/register");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

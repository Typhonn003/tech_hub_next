import { LoginData } from "@/interfaces/login.interface";
import { RegisterData } from "@/interfaces/register.interface";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, createContext, useState } from "react";
import { toast } from "react-toastify";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValues {
  login: (loginData: LoginData) => void;
  registerUser: (registerData: RegisterData) => void;
  registerLoading: boolean;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async (loginData: LoginData) => {
    try {
      const response = await api.post("sessions", loginData);
      setCookie(null, "tech-hub-token", response.data.token, {
        maxAge: 60 * 30,
        path: "/",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Usuário ou senha incorreto!");
    }
  };

  const registerUser = async (registerData: RegisterData) => {
    try {
      setRegisterLoading(true);
      await api.post("users", registerData);
      toast.success("Conta criada com sucesso!");
      setTimeout(() => {
        router.push("/login"), setRegisterLoading(false);
      }, 4500);
    } catch (error) {
      console.error(error);
      toast.error("Email já cadastrado!");
    }
  };

  return (
    <AuthContext.Provider value={{ login, registerUser, registerLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

import { LoginData } from "@/interfaces/login.interface";
import { RegisterData } from "@/interfaces/register.interface";
import { api } from "@/services/axiosClient";
import { useRouter } from "next/router";
import { setCookie, destroyCookie } from "nookies";
import { ReactNode, createContext } from "react";
import { toast } from "react-toastify";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValues {
  login: (loginData: LoginData) => void;
  registerUser: (registerData: RegisterData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const login = async (loginData: LoginData) => {
    try {
      const {
        data: { token },
      } = await api.post("sessions", loginData);
      setCookie(null, "tech-hub-token", token, {
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
      await api.post("users", registerData);
      toast.success("Conta criada com sucesso!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Email já cadastrado!");
    }
  };

  const logout = () => {
    destroyCookie(null, "tech-hub-token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

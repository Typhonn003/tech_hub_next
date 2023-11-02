import * as C from "@/components";
import Head from "next/head";
import { inter } from "@/fonts";
import { LoginData } from "@/interfaces/login.interface";
import { loginSchema } from "@/schemas";
import { api } from "@/services/axiosClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";

const Login: NextPage = () => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  return (
    <>
      <Head>
        <title>Tech Hub - Login</title>
      </Head>
      <main
        className={`${inter.className} m-auto flex min-h-screen w-[90vw] flex-col items-center justify-center gap-4 lg:w-full`}
      >
        <C.Title />
        <form
          className="mb-8 box-border flex w-full max-w-xs flex-col gap-6 rounded-md border border-primary-violet6 bg-gradient-to-bl from-primary-violet2 to-primary-violet3 px-4 py-8"
          onSubmit={handleSubmit(login)}
        >
          <h2 className="text-center">Login</h2>
          <C.Input
            label="Email"
            type="email"
            id="email"
            placeholder="Digite seu email"
            register={register("email")}
            error={
              errors.email?.message && (
                <C.SpanError>{errors.email.message}</C.SpanError>
              )
            }
          />
          <C.Input
            label="Senha"
            type="password"
            id="password"
            placeholder="Digite sua senha"
            register={register("password")}
            error={
              errors.password?.message && (
                <C.SpanError>{errors.password.message}</C.SpanError>
              )
            }
          />
          <C.LargeButton type="submit">Entrar</C.LargeButton>
          <C.Separator />
          <span className="text-center text-xs font-semibold">
            Ainda não possui uma conta?
          </span>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-primary-violet6 bg-primary-violet3 px-5 text-sm font-medium text-white no-underline transition-colors hover:border-primary-violet7 hover:bg-primary-violet4"
            href={"/register"}
          >
            Cadastre-se
          </Link>
        </form>
      </main>
    </>
  );
};

export default Login;

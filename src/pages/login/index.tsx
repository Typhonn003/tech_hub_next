import { Input, LargeButton, SpanError } from "@/components";
import { inter, knewave } from "@/fonts";
import { useAuth } from "@/hooks/useAuth";
import { LoginData } from "@/interfaces/login.interface";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Login: NextPage = () => {
  const { login } = useAuth();

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
        className={`${inter.className} flex flex-col w-[90vw] m-auto min-h-screen gap-4 items-center justify-center lg:w-full`}
      >
        <h1 className={`${knewave.className} text-center text-pink100 mt-8`}>
          Tech Hub
        </h1>
        <form
          className="box-border flex flex-col gap-6 w-full max-w-xs bg-grey400 px-4 py-8 rounded-md mb-8"
          onSubmit={handleSubmit(login)}
        >
          <h2 className="text-center">Login</h2>
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="Digite seu email"
            register={register("email")}
            error={
              errors.email?.message && (
                <SpanError>{errors.email.message}</SpanError>
              )
            }
          />
          <Input
            label="Senha"
            type="password"
            id="password"
            placeholder="Digite sua senha"
            register={register("password")}
            error={
              errors.password?.message && (
                <SpanError>{errors.password.message}</SpanError>
              )
            }
          />
          <LargeButton type="submit">Entrar</LargeButton>
          <span className="text-center font-semibold text-xs text-grey200">
            Ainda não possui uma conta?
          </span>
          <Link
            className="text-white inline-flex items-center justify-center bg-grey200 font-medium text-base no-underline h-10 px-5 rounded-md border-none hover:bg-grey300 transition-colors"
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

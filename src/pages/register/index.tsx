import {
  Input,
  LargeButton,
  LinkMedium,
  Select,
  SpanError,
  Title,
} from "@/components";
import { inter } from "@/fonts";
import { useAuth } from "@/hooks/useAuth";
import { RegisterData } from "@/interfaces/register.interface";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";

const Register: NextPage = () => {
  const { registerUser, registerLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  return (
    <div
      className={`${inter.className} flex flex-col w-[90vw] m-auto min-h-screen gap-4 items-center justify-center lg:w-full`}
    >
      <Head>
        <title>Tech Hub - Registro</title>
      </Head>
      <header className="w-full flex justify-between items-center max-w-xs mt-8 sm:max-w-4xl">
        <Title />
        <LinkMedium href={"/login"}>Voltar ao login</LinkMedium>
      </header>
      <main className="w-full h-full flex justify-center">
        <form
          className="box-border flex flex-col gap-6 w-full max-w-xs bg-grey400 px-4 py-8 rounded-md mb-8 sm:max-w-4xl"
          onSubmit={handleSubmit(registerUser)}
        >
          <h2 className="text-center">Crie sua conta</h2>
          <span className="text-center font-semibold text-xs text-grey200">
            Rapido e grátis, vamos nessa!
          </span>
          <div className="flex flex-col gap-6 sm:flex-row transition-all">
            <div className="flex flex-col gap-6 sm:w-2/4">
              <Input
                label="Nome"
                type="text"
                id="name"
                placeholder="Digite seu nome"
                register={register("name")}
                disabled={registerLoading}
                error={
                  errors.name && <SpanError>{errors.name?.message}</SpanError>
                }
              />
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="Digite seu email"
                register={register("email")}
                disabled={registerLoading}
                error={
                  errors.email && <SpanError>{errors.email?.message}</SpanError>
                }
              />
              <Input
                label="Bio"
                type="text"
                id="bio"
                placeholder="Fale sobre você"
                register={register("bio")}
                disabled={registerLoading}
                error={
                  errors.bio && <SpanError>{errors.bio?.message}</SpanError>
                }
              />
              <Input
                label="Contato"
                type="text"
                id="contact"
                placeholder="Opção de contato"
                register={register("contact")}
                disabled={registerLoading}
                error={
                  errors.contact && (
                    <SpanError>{errors.contact?.message}</SpanError>
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-6 sm:w-2/4">
              <Select
                label="Selecionar módulo"
                id="course_module"
                register={register("course_module")}
                disabled={registerLoading}
                error={
                  errors.course_module && (
                    <SpanError>{errors.course_module?.message}</SpanError>
                  )
                }
              >
                <option value="Primeiro Módulo">Primeiro módulo</option>
                <option value="Segundo módulo">Segundo módulo</option>
                <option value="Terceiro módulo">Terceiro módulo</option>
                <option value="Quarto módulo">Quarto módulo</option>
                <option value="Quinto módulo">Quinto módulo</option>
                <option value="Sexto módulo">Sexto módulo</option>
              </Select>
              <Input
                label="Senha"
                type="password"
                id="password"
                placeholder="Digite sua senha"
                register={register("password")}
                disabled={registerLoading}
                error={
                  errors.password && (
                    <SpanError>{errors.password?.message}</SpanError>
                  )
                }
              />
              <Input
                label="Confirmar senha"
                type="password"
                id="confirm_password"
                placeholder="Confirme sua senha"
                register={register("confirm_password")}
                disabled={registerLoading}
                error={
                  errors.confirm_password?.message && (
                    <SpanError>{errors.confirm_password.message}</SpanError>
                  )
                }
              />
              <div className="border-grey300 border-b-[1px]" />
              <LargeButton type="submit" disabled={registerLoading}>
                {registerLoading ? "Cadastrando..." : "Cadastrar"}
              </LargeButton>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;

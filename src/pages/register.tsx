import * as C from "@/components";
import Head from "next/head";
import { inter } from "@/fonts";
import { RegisterData } from "@/interfaces/register.interface";
import { registerSchema } from "@/schemas";
import { NextPage } from "next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { api } from "@/services/axiosClient";
import { toast } from "react-toastify";

const Register: NextPage = () => {
  const router = useRouter();

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
        <C.Title />
        <C.LinkMedium href={"/login"}>Voltar ao login</C.LinkMedium>
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
              <C.Input
                label="Nome"
                type="text"
                id="name"
                placeholder="Digite seu nome"
                register={register("name")}
                error={
                  errors.name && (
                    <C.SpanError>{errors.name?.message}</C.SpanError>
                  )
                }
              />
              <C.Input
                label="Email"
                type="email"
                id="email"
                placeholder="Digite seu email"
                register={register("email")}
                error={
                  errors.email && (
                    <C.SpanError>{errors.email?.message}</C.SpanError>
                  )
                }
              />
              <C.Input
                label="Bio"
                type="text"
                id="bio"
                placeholder="Fale sobre você"
                register={register("bio")}
                error={
                  errors.bio && <C.SpanError>{errors.bio?.message}</C.SpanError>
                }
              />
              <C.Input
                label="Contato"
                type="text"
                id="contact"
                placeholder="Opção de contato"
                register={register("contact")}
                error={
                  errors.contact && (
                    <C.SpanError>{errors.contact?.message}</C.SpanError>
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-6 sm:w-2/4">
              <C.Select
                label="Selecionar módulo"
                id="course_module"
                register={register("course_module")}
                error={
                  errors.course_module && (
                    <C.SpanError>{errors.course_module?.message}</C.SpanError>
                  )
                }
              >
                <option value="Primeiro Módulo">Primeiro módulo</option>
                <option value="Segundo módulo">Segundo módulo</option>
                <option value="Terceiro módulo">Terceiro módulo</option>
                <option value="Quarto módulo">Quarto módulo</option>
                <option value="Quinto módulo">Quinto módulo</option>
                <option value="Sexto módulo">Sexto módulo</option>
              </C.Select>
              <C.Input
                label="Senha"
                type="password"
                id="password"
                placeholder="Digite sua senha"
                register={register("password")}
                error={
                  errors.password && (
                    <C.SpanError>{errors.password?.message}</C.SpanError>
                  )
                }
              />
              <C.Input
                label="Confirmar senha"
                type="password"
                id="confirm_password"
                placeholder="Confirme sua senha"
                register={register("confirm_password")}
                error={
                  errors.confirm_password?.message && (
                    <C.SpanError>{errors.confirm_password.message}</C.SpanError>
                  )
                }
              />
              <div className="border-grey300 border-b-[1px]" />
              <C.LargeButton type="submit">Cadastrar</C.LargeButton>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;

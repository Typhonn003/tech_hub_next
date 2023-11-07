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
      className={`${inter.className} m-auto flex min-h-screen w-[90vw] flex-col items-center justify-center gap-4 lg:w-full`}
    >
      <Head>
        <title>Tech Hub - Registro</title>
        <meta
          name="description"
          content="Tech Hub é uma plataforma onde alunos podem se registrar para cadastrar tecnologias que estão estudando e trabalhos feitos até o momento."
        />
        <meta name="author" content="Diego Lima" />
        <meta property="og:title" content="Tech Hub" />
        <meta property="og:site_name" content="Tech Hub" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta
          property="og:description"
          content="Tech Hub é uma plataforma onde alunos podem se registrar para cadastrar tecnologias que estão estudando e trabalhos feitos até o momento."
        />
      </Head>
      <header className="mt-8 flex w-full max-w-xs items-center justify-between sm:max-w-4xl">
        <C.Title />
        <C.LinkMedium href={"/login"}>Voltar ao login</C.LinkMedium>
      </header>
      <main className="flex h-full w-full justify-center">
        <form
          className="mb-8 box-border flex w-full max-w-xs flex-col gap-6 rounded-md border border-primary-violet6 bg-gradient-to-bl from-primary-violet2 to-primary-violet3 px-4 py-8 sm:max-w-4xl"
          onSubmit={handleSubmit(registerUser)}
        >
          <h2 className="text-center">Crie sua conta</h2>
          <span className="text-center text-xs font-semibold text-secondary-crimson9">
            Rapido e grátis, vamos nessa!
          </span>
          <div className="flex flex-col gap-6 transition-all sm:flex-row">
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
              <C.Separator />
              <C.LargeButton type="submit">Cadastrar</C.LargeButton>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;

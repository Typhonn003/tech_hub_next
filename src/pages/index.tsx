import * as C from "@/components";
import Head from "next/head";
import { inter } from "@/fonts";
import { useFetch } from "@/hooks/useFetch";
import { UserData } from "@/interfaces/user.interface";
import { destroyCookie, parseCookies } from "nookies";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useModalStateStore } from "@/store";
import { VscGear } from "react-icons/vsc";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicAddTechModal = dynamic(() =>
  import("../components/index").then((mod) => mod.AddTechModal),
);

const DynamicAddWorkModal = dynamic(() =>
  import("../components/index").then((mod) => mod.AddWorkModal),
);

const DynamicEditTechModal = dynamic(() =>
  import("../components/index").then((mod) => mod.EditTechModal),
);

const DynamicEditProfileModal = dynamic(() =>
  import("../components/index").then((mod) => mod.EditProfileModal),
);

const DynamicEditWorkModal = dynamic(() =>
  import("../components/index").then((mod) => mod.EditWorkModal),
);

const Home: NextPage = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies["tech-hub-token"];
  const { data, isLoading, mutate } = useFetch<UserData>("/profile", token);
  const {
    addTechModalStatus,
    editTechModalStatus,
    editWorkModalStatus,
    editProfileModalStatus,
    toggleEditProfileModalStatus,
    addWorkModalStatus,
  } = useModalStateStore();
  const [select, isSelect] = useState<boolean>(true);

  const logout = () => {
    destroyCookie(null, "tech-hub-token");
    router.push("/login");
  };

  if (isLoading) return <C.LoadingScreen />;

  if (!data) {
    router.push("/login");
    return;
  }

  return (
    <div className={`${inter.className} min-h-screen`}>
      <Head>
        <title>Tech Hub</title>
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
      <header className="flex w-full justify-center border-b-[1px] border-primary-violet6">
        <div className="flex w-[90vw] justify-between py-6 sm:max-w-4xl">
          <C.Title />
          <div className="flex gap-4">
            <button
              className="text-2xl"
              onClick={toggleEditProfileModalStatus}
              aria-label="Clique para editar informações do perfil"
            >
              <VscGear />
            </button>
            <C.SmallButton onClick={logout}>Sair</C.SmallButton>
          </div>
        </div>
      </header>
      <main className="min-h-[500px] sm:m-auto sm:flex sm:w-[90vw] sm:max-w-4xl">
        <div className="sm:w-2/5 sm:rounded-bl-2xl sm:border-b sm:border-l sm:border-r sm:border-primary-violet6">
          <section className="flex w-full justify-center border-b-[1px] border-primary-violet6">
            <div className="flex w-[90vw] flex-col gap-2 py-6 sm:px-6">
              <h2 className="text-2xl font-bold">Olá, {data.name}!</h2>
              <span className="text-sm">
                Módulo atual: {data.course_module}
              </span>
            </div>
          </section>
          <nav className="border-b-[1px] border-primary-violet6">
            <div className="m-auto flex w-[90vw] flex-col gap-6 sm:w-full">
              <ul className="flex items-center justify-around font-bold sm:justify-evenly">
                <li>
                  <button
                    data-select={select}
                    className="select-button"
                    onClick={() => isSelect(true)}
                  >
                    Tecnologias
                  </button>
                </li>
                <li>
                  <div className="h-14 w-0 border-[1px] border-primary-violet6 sm:h-10" />
                </li>
                <li>
                  <button
                    data-select={!select}
                    className="select-button"
                    onClick={() => isSelect(false)}
                  >
                    Trabalhos
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <section className="m-auto flex w-[90vw] flex-col gap-6 pt-6 sm:m-0 sm:min-h-full sm:w-3/5 sm:max-w-4xl sm:rounded-br-2xl sm:border-b sm:border-r sm:border-primary-violet6 sm:p-6">
          {select ? (
            <C.TechsList techs={data.techs} />
          ) : (
            <C.WorksList works={data.works} />
          )}
        </section>
      </main>
      {addTechModalStatus ? (
        <DynamicAddTechModal mutate={mutate} data={data} />
      ) : null}
      {addWorkModalStatus ? (
        <DynamicAddWorkModal mutate={mutate} data={data} />
      ) : null}
      {editTechModalStatus ? (
        <DynamicEditTechModal mutate={mutate} data={data} />
      ) : null}
      {editWorkModalStatus ? (
        <DynamicEditWorkModal mutate={mutate} data={data} />
      ) : null}
      {editProfileModalStatus ? (
        <DynamicEditProfileModal mutate={mutate} data={data} />
      ) : null}
    </div>
  );
};

export default Home;

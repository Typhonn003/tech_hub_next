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

const timeMessage = () => {
  const time = new Date();
  const hour = time.getHours();

  if (6 <= hour && hour < 12) return "Bom dia";
  if (12 <= hour && hour < 18) return "Boa tarde";
  if (18 <= hour && hour < 24) return "Boa noite";
  else return "Boa madrugada";
};

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
    toggleAddTechModalStatus,
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
      </Head>
      <header className="flex w-full justify-center border-b-[1px] border-primary-violet6">
        <div className="flex w-[90vw] justify-between py-6 sm:max-w-4xl">
          <C.Title />
          <div className="flex gap-4">
            <button className="text-2xl" onClick={toggleEditProfileModalStatus}>
              <VscGear />
            </button>
            <C.SmallButton onClick={logout}>Sair</C.SmallButton>
          </div>
        </div>
      </header>
      <main>
        <section className="flex w-full justify-center border-b-[1px] border-primary-violet6">
          <div className="flex w-[90vw] flex-col gap-2 py-6 sm:max-w-4xl sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold">
              {timeMessage()}, {data.name}!
            </h2>
            <span className="text-sm font-bold">{data.course_module}</span>
          </div>
        </section>
        <nav className="border-b-[1px] border-primary-violet6">
          <div className="m-auto flex w-[90vw] flex-col gap-6 sm:max-w-4xl">
            <ul className="flex items-center justify-around font-bold">
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
                <div className="h-14 w-0 border-[1px] border-primary-violet6" />
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
        <section className="m-auto flex w-[90vw] flex-col gap-6 pt-6 sm:max-w-4xl">
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

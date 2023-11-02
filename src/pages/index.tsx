import * as C from "@/components";
import Head from "next/head";
import { inter } from "@/fonts";
import { useFetch } from "@/hooks/useFetch";
import { UserData } from "@/interfaces/user.interface";
import { destroyCookie, parseCookies } from "nookies";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useModalStateStore } from "@/store";
import dynamic from "next/dynamic";

const Home: NextPage = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies["tech-hub-token"];
  const { data, isLoading, mutate } = useFetch<UserData>("/profile", token);
  const { addModalStatus, toggleAddModalStatus, editModalStatus } =
    useModalStateStore();

  const logout = () => {
    destroyCookie(null, "tech-hub-token");
    router.push("/login");
  };

  if (isLoading) return <C.LoadingScreen />;

  if (!data) {
    router.push("/login");
    return;
  }

  const timeMessage = () => {
    const time = new Date();
    const hour = time.getHours();

    if (6 <= hour && hour < 12) return "Bom dia";
    if (12 <= hour && hour < 18) return "Boa tarde";
    if (18 <= hour && hour < 24) return "Boa noite";
    else return "Boa madrugada";
  };

  const DynamicAddModal = dynamic(() =>
    import("../components/index").then((mod) => mod.AddTechModal),
  );

  const DynamicEditModal = dynamic(() =>
    import("../components/index").then((mod) => mod.EditTechModal),
  );

  const DynamicTechCard = dynamic(() =>
    import("../components/index").then((mod) => mod.TechCard),
  );

  return (
    <div className={`${inter.className} min-h-screen`}>
      <Head>
        <title>Tech Hub</title>
      </Head>
      <header className="flex w-full justify-center border-b-[1px] border-primary-violet6">
        <div className="flex w-[90vw] justify-between py-6 sm:max-w-4xl">
          <C.Title />
          <C.SmallButton onClick={logout}>Sair</C.SmallButton>
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
        <section className="m-auto flex w-[90vw] flex-col gap-6 pt-6 sm:max-w-4xl">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Tecnologias</h2>
            <C.SmallButton type="button" onClick={toggleAddModalStatus}>
              Adicionar
            </C.SmallButton>
          </div>
          {data.techs.length > 0 ? (
            <ul className="grid max-h-96 w-full gap-4 overflow-hidden overflow-y-auto rounded-md border border-primary-violet6 bg-gradient-to-bl from-primary-violet2 to-primary-violet3 p-5 sm:grid-cols-2">
              {data.techs.map((tech) => (
                <DynamicTechCard key={tech.id} tech={tech} />
              ))}
            </ul>
          ) : (
            <div className="box-border w-full rounded-md border border-primary-violet6 bg-gradient-to-bl from-primary-violet2 to-primary-violet3 px-4 py-7">
              <p className="text-center text-xl font-medium sm:text-xl">
                Você ainda não tem nenhuma tecnologia cadastrada{" "}
                <span className="text-pink100">=(</span>
              </p>
            </div>
          )}
        </section>
      </main>
      {addModalStatus ? <DynamicAddModal mutate={mutate} data={data} /> : null}
      {editModalStatus ? (
        <DynamicEditModal mutate={mutate} data={data} />
      ) : null}
    </div>
  );
};

export default Home;

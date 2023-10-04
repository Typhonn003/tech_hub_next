import * as C from "@/components";
import Head from "next/head";
import { inter } from "@/fonts";
import { useFetch } from "@/hooks/useFetch";
import { UserData } from "@/interfaces/user.interface";
import { destroyCookie, parseCookies } from "nookies";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useModalStateStore } from "@/store";

const Home: NextPage = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies["tech-hub-token"];
  const { data, error, isLoading, mutate } = useFetch<UserData>(
    "/profile",
    token
  );
  const { addModalStatus, toggleAddModalStatus, editModalStatus } =
    useModalStateStore();

  const logout = () => {
    destroyCookie(null, "tech-hub-token");
    router.push("/login");
  };

  if (isLoading) return <p>Carregando...</p>;
  if (!data) return <p>Não existem dados...</p>;

  return (
    <div className={`${inter.className} min-h-screen`}>
      <Head>
        <title>Tech Hub</title>
      </Head>
      <header className="w-full flex justify-center border-b-[1px] border-grey300">
        <div className="w-[90vw] flex justify-between py-6 sm:max-w-4xl">
          <C.Title />
          <C.SmallButton onClick={logout}>Sair</C.SmallButton>
        </div>
      </header>
      <main>
        <section className="w-full flex justify-center border-b-[1px] border-grey300">
          <div className="w-[90vw] flex flex-col gap-2 py-6 sm:flex-row sm:justify-between sm:items-center sm:max-w-4xl">
            <h2 className="font-bold text-2xl">Olá, {data.name}!</h2>
            <span className="font-bold text-sm text-grey200">
              {data.course_module}
            </span>
          </div>
        </section>
        <section className="w-[90vw] flex flex-col gap-6 m-auto pt-6 sm:max-w-4xl">
          <div className="flex justify-between">
            <h2 className="font-bold text-2xl">Tecnologias</h2>
            <C.SmallButton type="button" onClick={toggleAddModalStatus}>
              Adicionar
            </C.SmallButton>
          </div>
          {data.techs.length > 0 ? (
            <ul className="w-full bg-grey400 grid gap-4 rounded-md p-5 max-h-96 overflow-hidden overflow-y-auto sm:grid-cols-2">
              {data.techs.map((tech) => (
                <C.TechCard key={tech.id} tech={tech} />
              ))}
            </ul>
          ) : (
            <div className="box-border w-full bg-grey400 rounded-md px-4 py-7">
              <p className="font-medium text-xl text-center sm:text-xl">
                Você ainda não tem nenhuma tecnologia cadastrada{" "}
                <span className="text-pink100">=(</span>
              </p>
            </div>
          )}
        </section>
      </main>
      {addModalStatus ? <C.AddTechModal mutate={mutate} data={data} /> : null}
      {editModalStatus ? <C.EditTechModal mutate={mutate} data={data} /> : null}
    </div>
  );
};

export default Home;

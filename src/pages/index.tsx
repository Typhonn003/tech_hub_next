import * as C from "@/components";
import Head from "next/head";
import { inter } from "@/fonts";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { UserData } from "@/interfaces/user.interface";
import { parseCookies } from "nookies";

const Home = () => {
  const cookies = parseCookies();
  const token = cookies["tech-hub-token"];
  const { data, error, isLoading } = useFetch<UserData>("/profile", token);
  const { logout } = useAuth();

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
            <C.SmallButton type="button">Adicionar</C.SmallButton>
          </div>
          {data.techs.length > 0 ? (
            <ul className="w-full bg-grey400 flex flex-col gap-4 rounded-md p-5">
              {data.techs.map((tech) => (
                <C.TechCard
                  key={tech.id}
                  title={tech.title}
                  status={tech.status}
                />
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
    </div>
  );
};

export default Home;

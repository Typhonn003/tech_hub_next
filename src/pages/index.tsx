import * as C from "@/components";
import { inter } from "@/fonts";
import { useAuth } from "@/hooks/useAuth";
import { UserData } from "@/interfaces/user.interface";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";

interface ContextInterface {
  token: string;
  data: UserData;
  techs: string[];
}

const Home = (ctx: ContextInterface) => {
  const { logout } = useAuth();

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
            <h2 className="font-bold text-2xl">Olá, {ctx.data.name}!</h2>
            <span className="font-bold text-sm text-grey200">
              {ctx.data.course_module}
            </span>
          </div>
        </section>
        <section className="w-[90vw] flex flex-col gap-6 m-auto pt-6 sm:max-w-4xl">
          <div className="flex justify-between">
            <h2 className="font-bold text-2xl">Tecnologias</h2>
            <C.SmallButton type="button">Adicionar</C.SmallButton>
          </div>
          {ctx.techs.length > 0 ? (
            <ul className="w-full h-14 bg-grey400 rounded-md"></ul>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies["tech-hub-token"];

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  api.defaults.headers.common.Authorization = `Bearer ${token}`;

  const {
    data,
    data: { techs },
  } = await api.get("profile");

  return {
    props: { token, data, techs },
  };
};

export default Home;

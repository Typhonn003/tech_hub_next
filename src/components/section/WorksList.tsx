import { useModalStateStore } from "@/store";
import { SmallButton } from "..";
import { WorkData } from "@/interfaces/work.interface";
import dynamic from "next/dynamic";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface WorksListProps {
  works: WorkData[];
}

const DynamicWorkCard = dynamic(() =>
  import("../cards/WorkCard").then((mod) => mod.WorkCard),
);

export const WorksList = ({ works }: WorksListProps) => {
  const { toggleAddWorkModalStatus } = useModalStateStore();

  return (
    <>
      <SmallButton type="button" onClick={toggleAddWorkModalStatus}>
        <AiOutlinePlusCircle />
        Adicionar trabalho
      </SmallButton>
      {works.length > 0 ? (
        <ul className="grid max-h-80 w-full gap-4 overflow-hidden overflow-y-auto rounded-md border border-primary-violet6 bg-gradient-to-bl from-primary-violet2 to-primary-violet3 p-5 sm:grid-cols-3 xl:max-h-96">
          {works.map((work) => (
            <DynamicWorkCard key={work.id} work={work} />
          ))}
        </ul>
      ) : (
        <div className="box-border w-full rounded-md border border-primary-violet6 bg-gradient-to-bl from-primary-violet2 to-primary-violet3 px-4 py-7">
          <p className="text-center text-xl font-medium sm:text-xl">
            Você ainda não tem nenhum trabalho cadastrado{" "}
            <span className="text-secondary-crimson10">=(</span>
          </p>
        </div>
      )}
    </>
  );
};

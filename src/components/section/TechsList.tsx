import { useModalStateStore } from "@/store";
import { SmallButton } from "..";
import dynamic from "next/dynamic";
import { TechData } from "@/interfaces/tech.interface";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface TechListProps {
  techs: TechData[];
}

const DynamicTechCard = dynamic(() =>
  import("../cards/TechCard").then((mod) => mod.TechCard),
);

export const TechsList = ({ techs }: TechListProps) => {
  const { toggleAddTechModalStatus } = useModalStateStore();

  return (
    <>
      <SmallButton type="button" onClick={toggleAddTechModalStatus} color="pink">
        <AiOutlinePlusCircle />
        Adicionar tecnologia
      </SmallButton>
      {techs.length > 0 ? (
        <ul className="grid max-h-80 w-full gap-4 overflow-hidden overflow-y-auto rounded-md border border-primary-violet6 bg-gradient-to-bl from-primary-violet2 to-primary-violet3 p-5 sm:grid-cols-2 xl:max-h-96">
          {techs.map((tech) => (
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
    </>
  );
};

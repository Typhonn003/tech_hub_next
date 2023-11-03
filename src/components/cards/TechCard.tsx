import { TechData } from "@/interfaces/tech.interface";
import { useModalStateStore, useSelectedTechStore } from "@/store";
import { FiEdit3 } from "react-icons/fi";

interface TechCardProps {
  tech: TechData;
}

export const TechCard = ({ tech }: TechCardProps) => {
  const { title, status } = tech;
  const { toggleEditTechModalStatus } = useModalStateStore();
  const { setTech } = useSelectedTechStore();

  return (
    <li className="box-border flex w-full flex-col items-center justify-between rounded-md border border-primary-violet6 bg-gradient-to-t from-primary-violet3 to-primary-violet4 px-6 py-3 transition-colors hover:border-primary-violet7 hover:bg-primary-violet4">
      <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold xs:max-w-full">
        Tech: {title}
      </h2>
      <div className="flex gap-2">
        <span className="text-primary-violet11">Status: {status}</span>
        <button
          aria-label="Botão para editar a tecnologia"
          onClick={() => {
            setTech(tech);
            toggleEditTechModalStatus();
          }}
        >
          <FiEdit3 />
        </button>
      </div>
    </li>
  );
};

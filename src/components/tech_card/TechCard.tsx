import { TechData } from "@/interfaces/tech.interface";
import { useModalStateStore, useSelectedTechStore } from "@/store";
import { FiEdit3 } from "react-icons/fi";

interface TechCardProps {
  tech: TechData;
}

export const TechCard = ({ tech }: TechCardProps) => {
  const { title, status } = tech;
  const { toggleEditModalStatus } = useModalStateStore();
  const { setTech } = useSelectedTechStore();

  return (
    <li className="box-border w-full flex justify-between items-center bg-grey500 px-6 py-3 rounded-md transition-colors hover:bg-grey300">
      <h2 className="font-semibold text-base max-w-[6ch] overflow-hidden text-ellipsis whitespace-nowrap xs:max-w-full sm:max-w-[8ch] xl:max-w-full">
        {title}
      </h2>
      <div className="flex gap-2">
        <span>{status}</span>
        <button
          aria-label="Botão para editar a tecnologia"
          onClick={() => {
            setTech(tech);
            toggleEditModalStatus();
          }}
        >
          <FiEdit3 />
        </button>
      </div>
    </li>
  );
};

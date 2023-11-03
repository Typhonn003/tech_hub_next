import { TechData } from "@/interfaces/tech.interface";
import { useModalStateStore, useSelectedTechStore } from "@/store";
import { BsThreeDots } from "react-icons/bs";

interface TechCardProps {
  tech: TechData;
}

export const TechCard = ({ tech }: TechCardProps) => {
  const { title, status } = tech;
  const { toggleEditTechModalStatus } = useModalStateStore();
  const { setTech } = useSelectedTechStore();

  return (
    <li className="relative box-border flex w-full flex-col justify-between rounded-md border border-primary-violet6 bg-gradient-to-t from-primary-violet3 to-primary-violet4 px-6 py-3 transition-colors hover:border-primary-violet7 hover:bg-primary-violet4">
      <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-primary-violet11 xs:max-w-full max-w-[14ch]">
        Tech: {title}
      </h2>
      <span className="text-sm">Status: {status}</span>
      <button
        className="absolute right-3 top-2"
        aria-label="Botão para editar a tecnologia"
        onClick={() => {
          setTech(tech);
          toggleEditTechModalStatus();
        }}
      >
        <BsThreeDots />
      </button>
    </li>
  );
};

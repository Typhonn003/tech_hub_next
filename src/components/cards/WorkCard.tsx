import { WorkData } from "@/interfaces/work.interface";
import { BsThreeDots } from "react-icons/bs";

interface WorkCardProps {
  work: WorkData;
}

export const WorkCard = ({ work }: WorkCardProps) => {
  const { title, description, deploy_url } = work;

  return (
    <li className="box-border flex flex-col overflow-hidden rounded-md border border-primary-violet6 bg-gradient-to-t from-primary-violet3 to-primary-violet4 transition-colors hover:border-primary-violet7 hover:bg-primary-violet4">
      <div className="flex flex-grow flex-col gap-3 px-6 py-6">
        <h2 className="text-xl font-semibold xs:max-w-full text-primary-violet11">
          {title}
        </h2>
        <p className="text-sm overflow-x-hidden text-ellipsis ">{description}</p>
      </div>
      <div className="flex">
        <a
          href={deploy_url}
          target="_blank"
          className="block w-full border-t border-primary-violet6 bg-primary-violet3 py-1 text-center hover:bg-primary-violet4  "
        >
          Demonstração
        </a>
        <button className="border-l border-t border-primary-violet6 bg-primary-violet3 px-4 hover:bg-primary-violet4">
          <BsThreeDots />
        </button>
      </div>
    </li>
  );
};

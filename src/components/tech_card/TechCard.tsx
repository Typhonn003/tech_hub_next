interface TechCardProps {
  title: string;
  status: string;
}

export const TechCard = ({ title, status }: TechCardProps) => {
  return (
    <li className="box-border w-full flex justify-between items-center bg-grey500 px-6 py-3 rounded-md transition-colors hover:bg-grey300">
      <h2 className="font-semibold text-base max-w-[8ch] overflow-hidden text-ellipsis whitespace-nowrap xs:max-w-[15ch] sm:max-w-[30ch] xl:max-w-full">
        {title}
      </h2>
      <span>{status}</span>
    </li>
  );
};

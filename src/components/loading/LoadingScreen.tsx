import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingScreen = () => {
  return (
    <div className="bg-primary-violet1 fixed left-0 top-0 flex min-h-screen w-full items-center justify-center">
      <span className="animate-pulse">Carregando...</span>
      <span className="ml-3 animate-spin text-4xl text-secondary-crimson10">
        <AiOutlineLoading3Quarters />
      </span>
    </div>
  );
};

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen flex items-center justify-center">
      <span className="animate-pulse">Carregando...</span>
      <span className="text-pink100 text-4xl animate-spin ml-3">
        <AiOutlineLoading3Quarters />
      </span>
    </div>
  );
};

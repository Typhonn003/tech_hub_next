import { TechData } from "@/interfaces/tech.interface";
import { create } from "zustand";

type selectedTechStoreProps = {
  tech: TechData | null;
  setTech: (value: TechData) => void;
};

export const useSelectedTechStore = create<selectedTechStoreProps>()((set) => ({
  tech: null,
  setTech: (value) => set(() => ({ tech: value })),
}));

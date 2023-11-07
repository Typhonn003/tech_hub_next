import { WorkData } from "@/interfaces/work.interface";
import { create } from "zustand";

type selectedTechStoreProps = {
  work: WorkData | null;
  setWork: (value: WorkData) => void;
};

export const useSelectedWorkStore = create<selectedTechStoreProps>()((set) => ({
  work: null,
  setWork: (value) => set(() => ({ work: value })),
}));

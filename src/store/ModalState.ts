import { create } from "zustand";

type useAddModalStoreProps = {
  addModalStatus: boolean;
  toggleAddModalStatus: () => void;
};

export const useAddModalStore = create<useAddModalStoreProps>()((set) => ({
  addModalStatus: false,
  toggleAddModalStatus: () =>
    set((prev) => ({ addModalStatus: !prev.addModalStatus })),
}));

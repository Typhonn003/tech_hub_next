import { create } from "zustand";

type modalStateStoreProps = {
  addModalStatus: boolean;
  toggleAddModalStatus: () => void;
  editModalStatus: boolean;
  toggleEditModalStatus: () => void;
};

export const useModalStateStore = create<modalStateStoreProps>()((set) => ({
  addModalStatus: false,
  toggleAddModalStatus: () =>
    set((prev) => ({ addModalStatus: !prev.addModalStatus })),
  editModalStatus: false,
  toggleEditModalStatus: () =>
    set((prev) => ({ editModalStatus: !prev.editModalStatus })),
}));

import { create } from "zustand";

type modalStateStoreProps = {
  addTechModalStatus: boolean;
  toggleAddTechModalStatus: () => void;
  editTechModalStatus: boolean;
  toggleEditTechModalStatus: () => void;
  editProfileModalStatus: boolean;
  toggleEditProfileModalStatus: () => void;
};

export const useModalStateStore = create<modalStateStoreProps>()((set) => ({
  addTechModalStatus: false,
  toggleAddTechModalStatus: () =>
    set((prev) => ({ addTechModalStatus: !prev.addTechModalStatus })),
  editTechModalStatus: false,
  toggleEditTechModalStatus: () =>
    set((prev) => ({ editTechModalStatus: !prev.editTechModalStatus })),
  editProfileModalStatus: false,
  toggleEditProfileModalStatus: () =>
    set((prev) => ({ editProfileModalStatus: !prev.editProfileModalStatus })),
}));

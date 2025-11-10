import { create } from "zustand";

interface NoteModalOpenStore {
  isOpen: boolean;
  openNoteModal: () => void;
  closeNoteModal: () => void;
}

export const useNoteModalStore = create<NoteModalOpenStore>((set) => ({
  isOpen: false,
  openNoteModal: () => set({ isOpen: true }),
  closeNoteModal: () => set({ isOpen: false }),
}));

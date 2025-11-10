import { create } from "zustand";
import { DiaryNote } from "@/lib/api/diaryApi";

interface SelectedNoteStore {
  selectedNote: DiaryNote | null;
  setSelectedNote: (note: DiaryNote | null) => void;
}

export const useSelectedNoteStore = create<SelectedNoteStore>((set) => ({
  selectedNote: null,
  setSelectedNote: (note) => set({ selectedNote: note }),
}));

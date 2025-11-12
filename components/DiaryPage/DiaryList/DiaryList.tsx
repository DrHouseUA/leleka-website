"use client";

import Image from "next/image";
import css from "./DiaryList.module.css";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import AddDiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";
import AddDiaryEntryForm from "@/components/AddDiaryEntryForm/AddDiaryEntryForm";
import { fetchNotes, FetchNotesResponse } from "@/lib/api/diaryApi";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNoteModalStore } from "@/lib/store/modalNoteStore";
import { useSelectedNoteStore } from "@/lib/store/selectedNoteStore";

export default function DiaryList() {
  const { isOpen, openNoteModal, closeNoteModal } = useNoteModalStore();
  const selectedNote = useSelectedNoteStore((s) => s.selectedNote);

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes"],
    queryFn: async () => await fetchNotes({ page: 1, limit: 100 }),
    placeholderData: keepPreviousData,
    refetchOnMount: "always",
  });
  const queryClient = useQueryClient();

  useMutation({
    mutationFn: async () => {
      await fetchNotes({ page: 1, limit: 100 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <section className={css["diary-list-container"]}>
      <div className={css["diary-list-block"]}>
        <div className={css["diary-list-header"]}>
          <div className={css["diary-header-left-content"]}>Ваші записи</div>
          <div className={css["diary-header-right-content"]}>
            <div>Новий запис</div>
            <Image
              className={css["add-icon"]}
              src="/add_icon.svg"
              width={24}
              height={24}
              alt="add icon"
              onClick={() => {
                useSelectedNoteStore.getState().setSelectedNote(null);
                openNoteModal();
              }}
            ></Image>
          </div>
        </div>
        <ul className={css["diary-list"]}>
          {data && data.diaryNotes.length > 0
            ? data.diaryNotes.map((note) => {
                return (
                  <li key={note._id} className={css["diary-item"]}>
                    <DiaryEntryCard {...note} />
                  </li>
                );
              })
            : ""}
          {data?.totalCount === 0 && (
            <p style={{ padding: "20px" }}>
              Наразі записи у щоденнику відсутні
            </p>
          )}
        </ul>
      </div>
      {isOpen && (
        <AddDiaryEntryModal
          onClose={() => {
            closeNoteModal();
            useSelectedNoteStore.getState().setSelectedNote(null);
          }}
        >
          <AddDiaryEntryForm editingNote={selectedNote ?? null} />
        </AddDiaryEntryModal>
      )}
    </section>
  );
}

"use client";

import Image from "next/image";
import css from "./DiaryEntryDetails.module.css";
import { useSelectedNoteStore } from "@/lib/store/selectedNoteStore";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { DiaryNote } from "@/lib/api/diaryApi";

export default function DiaryEntryDetails() {
  const selectedNote = useSelectedNoteStore((s) => s.selectedNote);
  const queryClient = useQueryClient();

  // якщо selectedNote є — беремо її. Інакше пробуємо знайти в кеші ["notes"].
  const noteFromCache: DiaryNote | undefined = React.useMemo(() => {
    if (selectedNote) return selectedNote;
    const notesData = queryClient.getQueryData<{ diaryNotes: DiaryNote[] }>([
      "notes",
    ]);
    return notesData?.diaryNotes?.find(Boolean);
  }, [selectedNote, queryClient]);

  const note = selectedNote ?? noteFromCache ?? null;

  if (!note) {
    return (
      <section className={css["diary-details-container"]}>
        <div className={css["diary-details-block"]}>
          <div className={css["diary-details-placeholder"]}>
            Оберіть запис щоб побачити деталі
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={css["diary-details-container"]}>
      <div className={css["diary-details-block"]}>
        <div className={css["diary-details-header"]}>
          <div className={css["diary-details-header-wrapper"]}>
            <div className={css["diary-details-title"]}>
              {note.title}
              <Image
                src="/edit_icon.svg"
                width={24}
                height={24}
                alt="edit"
                onClick={() => {
                  console.log("edit", note._id);
                }}
              />
            </div>
            <div className={css["diary-details-date"]}>
              {note.date}
              <Image
                src="/delete_icon.svg"
                width={24}
                height={24}
                alt="delete"
                onClick={() => {
                  console.log("delete", note._id);
                }}
              />
            </div>
          </div>

          <div className={css["diary-details-content"]}>{note.description}</div>

          <div className={css["diary-details-emotions"]}>
            <ul className={css["diary-details-emotions-list"]}>
              {note.emotions.map((e) => (
                <li key={e._id} className={css["diary-details-emotions-item"]}>
                  {e.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

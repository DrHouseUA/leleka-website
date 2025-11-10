"use client";

import { DiaryNote } from "@/lib/api/diaryApi";
import css from "./DiaryEntryCard.module.css";
import { useWindowSize } from "@/hooks/useWindowsSize";
import { useRouter } from "next/navigation";
import { useSelectedNoteStore } from "@/lib/store/selectedNoteStore";

export default function DiaryEntryCard(noteDetails: DiaryNote) {
  const { width } = useWindowSize();
  const router = useRouter();
  const setSelectedNote = useSelectedNoteStore((s) => s.setSelectedNote);

  const handleClick = () => {
    if (!noteDetails._id) return;
    if (width >= 1440) {
      // desktop: зберігаємо повну нотатку в store — правий панель візьме її напряму
      setSelectedNote(noteDetails);
    } else {
      // mobile/tablet: зберігаємо теж, потім навігація на окрему сторінку
      setSelectedNote(noteDetails);
      router.push(`/diary/${noteDetails._id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className={css["diary-item-root"]}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
      }}
    >
      <div className={css["diary-item-header"]}>
        <div className={css["diary-item-title"]}>{noteDetails.title}</div>
        <div className={css["diary-item-date"]}>{noteDetails.date}</div>
      </div>
      <ul className={css["diary-item-emotion-list"]}>
        {noteDetails.emotions &&
          noteDetails.emotions.map((emotion) => {
            return (
              <li key={emotion._id} className={css["diary-item-emotion"]}>
                {emotion.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

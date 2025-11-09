"use client";

import { DiaryNote } from "@/lib/api/diaryApi";
import css from "./DiaryEntryCard.module.css";

export default function DiaryEntryCard(noteDetails: DiaryNote) {
  return (
    <li className={css["diary-item"]}>
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
    </li>
  );
}

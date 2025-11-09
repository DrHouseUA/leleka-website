"use client";

import Image from "next/image";
import css from "./DiaryList.module.css";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import { useState } from "react";
import AddDiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";
import AddDiaryEntryForm from "@/components/AddDiaryEntryForm/AddDiaryEntryForm";
import { fetchNotes, FetchNotesResponse } from "@/lib/api/diaryApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function DiaryList() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes"],
    queryFn: () => fetchNotes({}),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  console.log(data);
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
              onClick={() => setIsModalOpen(true)}
            ></Image>
          </div>
        </div>
        <ul className={css["diary-list"]}>
          {data && data.diaryNotes.length > 0
            ? data.diaryNotes.map((note) => {
                return (
                  <li key={note._id} className={css["diary-item"]}>
                    <DiaryEntryCard {...note} />
                    {/* {note._id};{note.date}; {note.description};{" "}
                  {note.emotions.map((emotion) => {
                    return <p key={emotion._id}>{emotion.title}</p>;
                  })}
                  ; */}
                  </li>
                );
              })
            : ""}
          {!data && <p style={{ padding: "20px" }}>Наразі нотаток немає...</p>}
        </ul>
      </div>
      {isModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsModalOpen(false)}>
          <AddDiaryEntryForm />
        </AddDiaryEntryModal>
      )}
    </section>
  );
}

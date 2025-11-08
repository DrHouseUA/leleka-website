"use client";

import Image from "next/image";
import css from "./DiaryList.module.css";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import { useState } from "react";
import AddDiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";
import AddDiaryEntryForm from "@/components/AddDiaryEntryForm/AddDiaryEntryForm";

export default function DiaryList() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section className={css["diary-list-container"]}>
      <div className={css["diary-list-block"]}>
        <div className={css["diary-list-header"]}>
          <div className={css["diary-header-left-content"]}>Ваші записи</div>
          <div className={css["diary-header-right-content"]}>
            <div>Новий запис</div>
            {isModalOpen && (
              <AddDiaryEntryModal onClose={() => setIsModalOpen(false)}>
                <AddDiaryEntryForm />
              </AddDiaryEntryModal>
            )}
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
          <DiaryEntryCard />
          <DiaryEntryCard />
          <DiaryEntryCard />
          <DiaryEntryCard />
        </ul>
      </div>
    </section>
  );
}

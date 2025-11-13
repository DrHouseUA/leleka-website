"use client";

import styles from "./AddTaskModal.module.css";
import { useState } from "react";
import { createTask } from "@/lib/api/taskApi";
import { useQueryClient } from "@tanstack/react-query";
import { useTaskModalStore } from "@/lib/store/taskModalStore";

export default function AddTaskModal() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const queryClient = useQueryClient();
  const { closeModal } = useTaskModalStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;
    await createTask({ name, date });
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    closeModal();
  };

  const today = new Date().toISOString().slice(0, 10);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const max = maxDate.toISOString().slice(0, 10);

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          ×
        </button>
        <h2 className={styles.title}>Нове завдання</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="name">
            Назва завдання
          </label>
          <input
            id="name"
            className={styles.input}
            type="text"
            placeholder="Прийняти вітаміни"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className={styles.label} htmlFor="date">
            Дата
          </label>
          <input
            id="date"
            className={styles.input}
            type="date"
            value={today}
            min={today}
            max={max}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className={styles.button} type="submit">
            Зберегти
          </button>
        </form>
      </div>
    </div>
  );
}

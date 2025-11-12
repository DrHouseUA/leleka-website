"use client";

import styles from "./TaskReminderCard.module.css";
import { Task } from "@/types/task";
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchTasks, updateTaskStatus } from "@/lib/api/taskApi";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { useTaskModalStore } from "@/lib/store/taskModalStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function TaskReminderCard() {
  const { isOpen, openModal } = useTaskModalStore();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    placeholderData: keepPreviousData,
  });

  const { mutate: toggleStatus } = useMutation({
    mutationFn: (task: Task) => updateTaskStatus(task._id, !task.isDone),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const tasks = data?.tasks ?? [];

  const handleAddTaskClick = () => {
    if (!user) {
      router.push("/auth/register");
      return;
    }
    openModal();
  };


  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Важливі завдання</h2>
        <button onClick={handleAddTaskClick}>＋</button>
      </div>

      {tasks.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>Наразі немає жодних завдань</p>
          <p className={styles.emptySubtitle}>Створіть мерщій нове завдання!</p>
          <button className={styles.createButton} onClick={handleAddTaskClick}>
            Створити завдання
          </button>
        </div>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((t) => (
            <li
              key={t._id}
              className={`${styles.taskItem} ${t.isDone ? styles.done : ""}`}
            >
              <span className={styles.taskDate}>
                {new Date(t.date).toLocaleDateString("uk-UA", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </span>

              <div className={styles.taskContent}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={() => toggleStatus(t)}
                  />
                </label>

                <span className={styles.taskName}>{t.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && <AddTaskModal />}
    </div>
  );
}
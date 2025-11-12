"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./StatusBlock.module.css";
import { getBabyData } from "@/lib/api/babyService";
import { useAuthStore } from "@/lib/store/authStore";

export default function StatusBlock() {
  const { isAuthenticated } = useAuthStore();
  const { data, isError } = useQuery({
    queryKey: ["babyData"],
    queryFn: () => getBabyData(isAuthenticated),
  });

  if (isError || !data?.data) {
    return (
      <div className={css.block}>
        <div className={css.wrapper}>
          <p className={css.error}>Не вдалося завантажити статус</p>
        </div>
        <div className={css.wrapper}>
          <p className={css.error}>Не вдалося завантажити статус</p>
        </div>
      </div>
    );
  }

  const { curWeekToPregnant, daysBeforePregnant } = data.data;

  return (
    <div className={css.block}>
      <div className={css.wrapper}>
        <span className={css.label}>Тиждень</span>
        <span className={css.value}>{curWeekToPregnant}</span>
      </div>
      <div className={css.wrapper}>
        <span className={css.label}>Днів до зустрічі</span>
        <span className={css.value}>~{daysBeforePregnant}</span>
      </div>
    </div>
  );
}

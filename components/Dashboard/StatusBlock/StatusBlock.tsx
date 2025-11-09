"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./StatusBlock.module.css";
import { getBabyData } from "@/lib/api/babyService";
import { useAuth } from "@/hooks/useAuth";

export default function StatusBlock() {
  const { isAuth } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["babyData"],
    queryFn: () => getBabyData(isAuth),
  });

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

  if (isError || !data?.data) {
    return (
      <div className={css.block}>
        <p className={css.error}>Не вдалося завантажити статус</p>
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

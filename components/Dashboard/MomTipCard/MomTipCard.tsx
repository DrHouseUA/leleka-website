"use client";

import { useQuery } from "@tanstack/react-query";

import css from "./MomTipCard.module.css";
import { getBabyData } from "@/lib/api/babyService";
import { useAuthStore } from "@/lib/store/authStore";

export default function MomTipCard() {
  const { isAuthenticated } = useAuthStore();
  const { data, isError } = useQuery({
    queryKey: ["babyData"],
    queryFn: () => getBabyData(isAuthenticated),
  });

  if (isError || !data?.data?.momHint) {
    return (
      <div className={css.card}>
        <p className={css.error}>Не вдалося завантажити пораду 😔</p>
      </div>
    );
  }

  const momHint = data.data.momHint;

  return (
    <div className={css.card}>
      <h3 className={css.title}>Порада для мами</h3>
      <p className={css.text}>{momHint}</p>
    </div>
  );
}

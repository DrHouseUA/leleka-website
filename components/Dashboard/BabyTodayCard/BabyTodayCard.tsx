"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import css from "./BabyTodayCard.module.css";
import type { BabyToday } from "@/types/baby";
import { getBabyData } from "@/lib/api/babyService";
import { useAuthStore } from "@/lib/store/authStore";

export default function BabyTodayCard() {
  const { isAuthenticated } = useAuthStore();
  const { data, isError } = useQuery({
    queryKey: ["babyData"],
    queryFn: async () => await getBabyData(isAuthenticated),
    placeholderData: keepPreviousData,
    refetchOnReconnect: "always",
    refetchOnMount: "always",
  });

  if (isError || !data?.data?.babyToday) {
    return (
      <div className={css.card}>
        <p className={css.error}>Не вдалося завантажити дані</p>
      </div>
    );
  }

  const baby: BabyToday = data.data.babyToday;

  return (
    <div className={css.card}>
      <h3 className={css.title}>Малюк сьогодні</h3>

      <div className={css.content}>
        {baby.image && (
          <div className={css.imageWrapper}>
            <Image
              src={baby.image}
              alt="Ілюстрація малюка"
              width={140}
              height={140}
              className={css.image}
            />
          </div>
        )}

        <div className={css.textWrapper}>
          <p className={css.info}>
            Розмір: <span className={css.infotext}>{baby.babySize} см</span>
          </p>
          <p className={css.info}>
            Вага: <span className={css.infotext}>{baby.babyWeight} г</span>
          </p>
          <p className={css.info}>
            Активність:{" "}
            <span className={css.infotext}>{baby.babyActivity}</span>
          </p>
        </div>
      </div>
      <p className={css.infotext}>{baby.babyDevelopment}</p>
    </div>
  );
}

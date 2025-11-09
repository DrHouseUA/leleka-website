"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import css from "./BabyTodayCard.module.css";
import type { BabyToday } from "@/types/baby";
import { getBabyData } from "@/lib/api/babyService";
import { useAuth } from "@/hooks/useAuth";

export default function BabyTodayCard() {
  const { isAuth } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["babyData"],
    queryFn: () => getBabyData(isAuth),
  });

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

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
        <p className={css.infotext}>{baby.babyDevelopment}</p>
      </div>
    </div>
  );
}

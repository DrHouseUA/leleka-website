"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./JourneyDetails.module.css";
import { useJourneyStore } from "@/lib/store/journeyStore";
import { getBabyDetails, getMomDetails } from "@/lib/api/clientApi";
import MomTab from "../MomTab/MomTab";
import BabyTab from "../BabyTab/BabyTab";

interface JourneyDetailsProps {
  weekNumber: number;
}

export default function JourneyDetails({ weekNumber }: JourneyDetailsProps) {
  const { activeTab, setActiveTab } = useJourneyStore();

  const {
    data: babyData,
    isLoading: babyLoading,
    error: babyError,
  } = useQuery({
    queryKey: ["baby", weekNumber],
    queryFn: () => getBabyDetails(weekNumber),
    enabled: weekNumber > 0,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: momData,
    isLoading: momLoading,
    error: momError,
  } = useQuery({
    queryKey: ["mom", weekNumber],
    queryFn: () => getMomDetails(weekNumber),
    enabled: weekNumber > 0,
    staleTime: 5 * 60 * 1000,
  });

  // Показуємо toast при помилці
  useEffect(() => {
    if (babyError && activeTab === "baby") {
      toast.error("Помилка завантаження даних про малюка. Спробуйте ще раз.");
    }
  }, [babyError, activeTab]);

  useEffect(() => {
    if (momError && activeTab === "mom") {
      toast.error("Помилка завантаження даних про маму. Спробуйте ще раз.");
    }
  }, [momError, activeTab]);

  const isLoading = activeTab === "baby" ? babyLoading : momLoading;

  return (
    <div className={css.journeyDetailsWrapper}>
      <Toaster position="top-right" />
      
      <div className={css.tabsWrapper}>
        <button
          onClick={() => setActiveTab("baby")}
          className={activeTab === "baby" ? css.tabButtonActive : css.tabButton}
        >
          Розвиток малюка
        </button>
        <button
          onClick={() => setActiveTab("mom")}
          className={activeTab === "mom" ? css.tabButtonActive : css.tabButton}
        >
          Тіло мами
        </button>
      </div>

      <div className={css.contentContainer}>
        {isLoading && (
          <div className={css.loaderContainer}>
            <div className={css.spinner} />
          </div>
        )}

        {!isLoading && (
          <>
            {activeTab === "baby" && babyData && <BabyTab data={babyData} />}
            {activeTab === "mom" && momData && <MomTab data={momData} />}
          </>
        )}
      </div>
    </div>
  );
}

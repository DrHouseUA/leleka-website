"use client";

import { useQuery } from "@tanstack/react-query";
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

  const isLoading = activeTab === "baby" ? babyLoading : momLoading;
  const error = activeTab === "baby" ? babyError : momError;

  return (
    <div className={css.journeyDetailsWrapper}>
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

      {/* Контент ВСЕРЕДИНІ блакитного контейнера */}
      <div className={css.contentContainer}>
        {isLoading && (
          <div className={css.loaderContainer}>
            <div className={css.spinner} />
          </div>
        )}

        {error && (
          <div className={css.errorMessage}>
            Помилка завантаження даних. Спробуйте ще раз.
          </div>
        )}

        {!isLoading && !error && (
          <>
            {activeTab === "baby" && babyData && <BabyTab data={babyData} />}
            {activeTab === "mom" && momData && <MomTab data={momData} />}
          </>
        )}
      </div>
    </div>
  );
}

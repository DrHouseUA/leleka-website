"use client";

import { useEffect, useRef } from "react";
import css from "./WeekSelector.module.css";

interface WeekSelectorProps {
  currentWeek: number;
  selectedWeek: number;
  onWeekChange: (week: number) => void;
}

export default function WeekSelector({
  currentWeek,
  selectedWeek,
  onWeekChange,
}: WeekSelectorProps) {
  const weeks = Array.from({ length: 42 }, (_, i) => i + 1);
  const weeksContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (weeksContainerRef.current && selectedWeek) {
      const index = weeks.indexOf(selectedWeek);
      if (index !== -1) {
        weeksContainerRef.current.children[index]?.scrollIntoView({
          behavior: "instant",
          inline: "start",
        });
      }
    }
  }, [selectedWeek, weeks]);

  return (
    <div className={css.weekSelectorContainer} ref={weeksContainerRef}>
      {weeks.map((week) => {
        const isCurrent = week === currentWeek;
        const isSelected = week === selectedWeek;
        const isFuture = week > currentWeek;
        const isDisabled = isFuture;

        let buttonClass = css.weekButton;
        if (isSelected) {
          buttonClass = css.activatedButton;
        } else if (isCurrent) {
          buttonClass = css.currentButton;
        } else if (isDisabled) {
          buttonClass = css.disabledBtn;
        }

        return (
          <button
            key={week}
            onClick={() => !isDisabled && onWeekChange(week)}
            disabled={isDisabled}
            className={buttonClass}
          >
            <p className={css.weekNumbers}>{week}</p>
            <p className={css.weekText}>Тиждень</p>
          </button>
        );
      })}
    </div>
  );
}
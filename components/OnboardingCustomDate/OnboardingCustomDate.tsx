"use client";

import { useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js";
import type { DateTimePickerHandle } from "react-flatpickr";
import styles from "./OnboardingCustomDate.module.css";

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export default function OnboardingCustomDate({
  value,
  onChange,
  placeholder = "Оберіть дату",
  minDate,
  maxDate,
}: CustomDatePickerProps) {
  const flatpickrRef = useRef<DateTimePickerHandle | null>(null);

  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatForAPI = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const parsedDate = parseDate(value);
    if (flatpickrRef.current?.flatpickr && parsedDate) {
      flatpickrRef.current.flatpickr.setDate(parsedDate);
    }
  }, [value]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className={styles.container}>
      <Flatpickr
        ref={flatpickrRef}
        value={parseDate(value) || ""}
        onChange={([date]: Date[]) => {
          if (!date) return;
          onChange(formatForAPI(date));
        }}
        options={{
          locale: Ukrainian,
          dateFormat: "d.m.Y",
          minDate: minDate || today,
          maxDate: maxDate,
          disableMobile: true,
          showMonths: 1,
          position: "above right",
          onDayCreate: (dObj, dStr, fp, dayElem) => {
            if (!dayElem.classList.contains("flatpickr-disabled")) {
              dayElem.style.color = "#000000";
              dayElem.style.opacity = "1";
            }
          },
        }}
        className={styles.input}
        placeholder={placeholder}
      />

      {/* Calendar icon button */}
      <button
        type="button"
        className={styles.iconButton}
        onClick={() => flatpickrRef.current?.flatpickr?.open()}
      >
        {/* < size={20} color="#383737ff" /> */}
      </button>
    </div>
  );
}
"use client";
import GreetingBlock from "@/components/DashboardPage/GreetingBlock/GreetingBlock";
import DiaryEntryDetails from "@/components/DiaryPage/DiaryEntryDetails/DiaryEntryDetails";
import DiaryList from "@/components/DiaryPage/DiaryList/DiaryList";
import { useWindowSize } from "@/hooks/useWindowsSize";
import css from "./Diarylauout.module.css";

export default function JourneyPage() {
  const { width } = useWindowSize();
  return (
    <div>
      <GreetingBlock />
      <div className={css.wrapper}>
        <DiaryList />
        {width >= 1440 ? <DiaryEntryDetails /> : null}
      </div>
    </div>
  );
}

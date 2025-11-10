"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./GreetingBlock.module.css";

export default function GreetingBlock() {
  const { user } = useAuthStore();

  // if (isLoading) {
  //   return <p className={css.loading}>Loading...</p>;
  // }

  // if (isLoading) {
  //   return <p className={css.loading}>Loading...</p>;
  // }

  // if (isError || !user?.name) {
  //   return (
  //     <div className={css.block}>
  //       <p className={css.title}>Доброго дня!</p>
  //     </div>
  //   );
  // }
  return (
    <div className={css.block}>
      <h2 className={css.title}>Доброго ранку, {user?.name}!</h2>
    </div>
  );
}

"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./GreetingBlock.module.css";

export default function GreetingBlock() {
  const user = useAuthStore((s) => s.user);

  if (!user)
    return (
      <div className={css.block}>
        <h2 className={css.title}>Доброго ранку!</h2>
      </div>
    );

  return (
    <div className={css.block}>
      <h2 className={css.title}>Доброго ранку {user && ", " + user.name}!</h2>
    </div>
  );
}

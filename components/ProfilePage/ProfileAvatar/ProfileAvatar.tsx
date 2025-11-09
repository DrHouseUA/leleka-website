"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import css from "./ProfileAvatar.module.css";

export default function ProfileAvatar() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className={css.container}>
      <div className={css.avatarImage}>
        {" "}
        <Image
          src={
            user?.avatarUrl ??
            `https://ftp.goit.study/img/common/women-default-avatar.jpg`
          }
          height={132}
          width={132}
          alt="user avatar"
        />
      </div>

      <div className={css.userInfo}>
        <div className={css.userName}>Ganna</div>
        <div className={css.userEmail}>Email</div>
      </div>
      <button className={css.downloadAvatar}>Завантажити</button>
    </div>
  );
}

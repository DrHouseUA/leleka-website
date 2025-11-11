"use client";
import { uploadImage } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "next/dist/server/api-utils";
import Image from "next/image";
import { useRef, useState } from "react";
import css from "./OnboardingAvatar.module.css";

export default function ProfileAvatar() {
  const [error, setError] = useState("");
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { user: updatedUser } = await uploadImage(file);
        console.log(updatedUser);
        setUser({
          ...user,
          ...updatedUser,
        });
      } catch (error) {
        setError((error as ApiError).message);
      }
    }
  };

  return (
    <div className={css.avatarSection}>
      <>
        <Image
          src={"/avatar_image.png"}
          alt={"user avatar"}
          height={132}
          width={132}
          className={css.avatarImage}
        />
        <div className={css.profileInfo}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button onClick={handleButtonClick} className={css.uploadButton}>
            Завантажити фото
          </button>
          {error && <p>{error}</p>}
        </div>
      </>
    </div>
  );
}

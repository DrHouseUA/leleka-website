"use client";
import { uploadImage } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "next/dist/server/api-utils";
import Image from "next/image";
import { useRef, useState } from "react";
import css from "./OnboardingAvatar.module.css";
import toast from "react-hot-toast";

export default function ProfileAvatar() {
  const [error, setError] = useState("");
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [localAvatar, setLocalAvatar] = useState<string | null>(
    user?.avatarUrl ?? null
  );

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.removeAll();

      const previewUrl = URL.createObjectURL(file);
      setLocalAvatar(previewUrl);
      try {
        toast.loading("йде завантаження");
        const { user: updatedUser } = await uploadImage(file);
        console.log(updatedUser);
        setUser({
          ...user,
          ...updatedUser,
        });
        toast.removeAll();
        toast.success("Зобрження завантажено успішно!", {
          position: "top-right",
        });
      } catch (error) {
        setError((error as ApiError).message);
        toast.removeAll();
        toast.error("Завантаження не вдалось, виберіть фото розміром до 1 МБ", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className={css.avatarSection}>
      <>
        <Image
          src={
            localAvatar ??
            user?.avatarUrl ??
            "https://ftp.goit.study/img/common/women-default-avatar.jpg"
          }
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
        </div>
      </>
    </div>
  );
}

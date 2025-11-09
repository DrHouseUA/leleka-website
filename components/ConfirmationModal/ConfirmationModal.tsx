"use client";

import { useEffect } from "react";
import css from "./ConfirmationModal.module.css";
import Image from "next/image";
import toast from "react-hot-toast";
import { useModalStore } from "@/lib/store/modalStore";
import { useRouter } from "next/navigation";

export default function ConfirmationModal() {
  const { isOpen, options, closeModal } = useModalStore();
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      await options?.onConfirm?.();
      toast.success("Дію виконано успішно ✅");
      closeModal();
      router.push("/");
    } catch (error) {
      toast.error("Сталася помилка ");
      console.error(error);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={closeModal}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeBtn}
          onClick={closeModal}
          aria-label="Close modal"
        >
          <Image src="/close.svg" alt="Close" width={24} height={24} />
        </button>

        <h2 className={css.title}>{options?.title}</h2>

        <div className={css.actions}>
          <button type="button" className={css.cancelBtn} onClick={closeModal}>
            {options?.canceleBtnText}
          </button>
          <button
            type="button"
            className={css.confirmBtn}
            onClick={handleConfirm}
          >
            {options?.confirmBtnText}
          </button>
        </div>
      </div>
    </div>
  );
}

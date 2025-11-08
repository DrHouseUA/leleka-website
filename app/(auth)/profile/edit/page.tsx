"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./OnboardingPage.module.css";
import Link from "next/link";
import OnboardingForm from "@/components/OnboardingForm/OnboardingForm";

export default function EditProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);

    router.push("/");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={"/"}>
          <svg className={styles.logo} width={105} height={45}>
            <use href="#logo-white" />
          </svg>
        </Link>
      </header>

      <div className={styles.pageContainer}>
        <div className={styles.formColumn}>
          <OnboardingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
        <div className={styles.illustrationColumn}>
          <Image
            src="/parystok.png"
            alt="Іллюстрация ростка"
            width={720}
            height={900}
            priority
          />
        </div>
      </div>
    </div>
  );
}
"use client";

import css from "./RegisterPage.module.css";
import { registerUser } from "@/lib/api/clientApi";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";
import { useRouter } from "next/navigation";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const userData = { name, email, password };
      const { data: statusCode } = await registerUser(userData);
      if (statusCode === 204) {
        router.push("/profile/edit");
      } else {
        setError("Bad request | Invalid body");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };

  return (
    <>
      <RegistrationForm></RegistrationForm>

        {error && (
          <p className={css.error}>
            {/* {"Виникла помилка(для розробників): бекенд повертає таку помилку "} */}
            {error}
          </p>
        )}
    </>
  );
}

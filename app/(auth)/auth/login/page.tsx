"use client";

import { loginUser } from "@/lib/api/clientApi";
import css from "./LoginPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { setUser } = useAuthStore();

  const handleSubmit = async (formData: FormData) => {
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const userData = { email, password };
      const { user } = await loginUser(userData);
      if (user) {
        setUser(user);
        router.push("/");
      } else {
        setError("Invalid email or password");
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
    <LoginForm>
      
    </LoginForm>
  );
}

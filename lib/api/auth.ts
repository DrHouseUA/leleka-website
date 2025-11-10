import axios from "axios";
import type { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    console.log("Функцію з auth викликано");
    const { data } = await api.get("/users/current");
    return data;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const logoutRequest = async (): Promise<void> => {
  await api.post("/auth/logout");
};

import axios from "axios";
import type { BabyDataResponse } from "@/types/baby";

const API_URL = "https://lehlehka.b.goit.study";

export const getBabyData = async (
  isAuth: boolean
): Promise<{ data: BabyDataResponse }> => {
  const endpoint = isAuth
    ? `${API_URL}/weeks/greeting`
    : `${API_URL}/weeks/greeting/public`;

  try {
    const response = await axios.get<BabyDataResponse>(endpoint, {
      headers: { Accept: "application/json" },
      withCredentials: isAuth,
    });

    return response;
  } catch (error) {
    console.error("Помилка при отриманні даних з бекенду:", error);
    throw error;
  }
};

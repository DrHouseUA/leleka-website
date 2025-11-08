import LoginForm from "@/components/LoginForm/LoginForm";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import { notFound } from "next/navigation";

type JourneyPageProps = {
  params: Promise<{ authType?: string[] }>;
};

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { authType } = await params;
  const validTypes = ["login", "register"];
  if (!authType || !validTypes.includes(authType[0])) {
    return notFound();
  }
  return authType[0] === "login" ? <LoginForm /> : <RegistrationForm />;
}
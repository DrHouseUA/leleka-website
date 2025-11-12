"use client";

import Loading from "@/app/loading";
import { checkServerSession, getUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const session = await checkServerSession();
        if (!mounted) return;

        if (session.success) {
          const user = await getUser();
          if (mounted && user) {
            setUser(user);
          }
        } else {
          if (mounted) clearIsAuthenticated();
        }
      } catch (err) {
        console.warn("AuthProvider check error", err);
        if (mounted) clearIsAuthenticated();
      } finally {
        if (mounted) setIsInitialized(true);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [setUser, clearIsAuthenticated]);

  if (!isInitialized) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthProvider;

import React, { useEffect } from "react";
import { Slot, useRouter } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";

export default function AuthLayout() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/(app)");
    }
  }, [session, router]);

  return <Slot />;
}

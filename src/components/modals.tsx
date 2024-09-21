"use client";

import { SubscriptionModal } from "@/features/subscriptions/components/subscription-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false); // to prevent hydration error beacuse of ssr

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SubscriptionModal />
    </>
  );
};

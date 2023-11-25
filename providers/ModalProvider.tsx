"use client";

import AuthModal from "@/components/AuthModal";
import { SettingsModal } from "@/components/SettingsModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return ( 
    <>
      <SettingsModal />
      <AuthModal />
    </>
   );
}

export default ModalProvider;
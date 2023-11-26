"use client";

import AuthModal from "@/components/AuthModal";
import { SettingsModal } from "@/components/SettingsModal";
import { UploadPublicationModal } from "@/components/UploadPublicationModal";
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
      <UploadPublicationModal/>
      <AuthModal />
    </>
   );
}

export default ModalProvider;
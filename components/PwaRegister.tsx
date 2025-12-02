// components/PwaRegister.tsx (client component)
"use client";
import React, { useEffect } from "react";
import { useState } from "react";

export default function PwaRegister({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("SW registered", reg))
        .catch((err) => console.warn("SW registration failed", err));
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    console.log("User choice:", choiceResult.outcome);

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  return (
    <>
      {children}

      {showBanner && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleInstallClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105"
          >
            📱 Download App Now
          </button>
        </div>
      )}
    </>
  );
}

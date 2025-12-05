"use client";
import React, { useEffect, useState } from "react";
import PwaInstallModal from "./PwaInstallModal";
import { useUser } from "../context/UserContext";

export default function PwaRegister({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loadUser } = useUser();
  const [hydrated, setHydrated] = useState(false); // client render check
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false); // new

  // Load user from localStorage
  useEffect(() => {
    loadUser();
    setHydrated(true);
  }, []);

  // Detect if app is installed
  useEffect(() => {
    if (!hydrated) return;

    const checkInstalled = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;
      setIsPwaInstalled(standalone);
    };

    checkInstalled();

    // Listen for appinstalled event
    const handleAppInstalled = () => setIsPwaInstalled(true);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [hydrated]);

  // Show modal only if user is not registered AND PWA is installed
  useEffect(() => {
    if (!hydrated) return;

    if (!user && isPwaInstalled) {
      setShowModal(true);
    }
  }, [hydrated, user, isPwaInstalled]);

  const closeModal = () => {
    setShowModal(false);
  };

  // PWA Install prompt
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

    const handleAppInstalled = () => {
      console.log("App installed!");
      setTimeout(() => setShowModal(true), 5000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // iOS detection
    if ((window.navigator as any).standalone) {
      setTimeout(() => setShowModal(true), 5000);
    }

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setTimeout(() => setShowModal(true), 5000);
      console.log("User choice:", choiceResult.outcome);
    }

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

      {showModal && <PwaInstallModal isOpen={true} onClose={closeModal} />}
    </>
  );
}

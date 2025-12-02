"use client";
import { useEffect, useState } from "react";

export default function IosA2HS() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const isInStandalone =
      (window.navigator as any).standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches;

    // Only show if iOS Safari + NOT installed
    if (isIOS && !isInStandalone) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      {/* Floating Bubble */}
      <div className="bg-white shadow-2xl rounded-2xl px-4 py-3 w-[290px] text-gray-800 border border-gray-200 relative">
        {/* Arrow */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 
          border-l-8 border-r-8 border-b-8 border-l-transparent 
          border-r-transparent border-b-white drop-shadow"
        ></div>

        <div className="text-center text-sm font-medium mb-2">
          📲 Add to Home Screen
        </div>

        {/* Instructions */}
        <p className="text-xs text-gray-600 text-center leading-relaxed">
          Tap the <span className="font-semibold">Share</span> icon →
          <span className="font-semibold"> “Add to Home Screen”</span>
        </p>

        {/* iOS Share Icon */}
        <div className="flex justify-center mt-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <i className="ri-share-circle-line text-xl text-purple-600"></i>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

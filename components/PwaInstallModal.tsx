// components/PwaInstallModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import RegistrationModal from "./RegistrationModal";

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PwaInstallModal({
  isOpen,
  onClose,
}: PwaInstallModalProps) {
  if (!isOpen) return null;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Welcome!
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Your app is installed. What would you like to do next?
        </p>
        <div className="flex flex-col space-y-3">
          <a
            href="#register"
            className="px-4 py-2 bg-purple-600 text-white rounded-full text-center hover:bg-purple-700 transition shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            Create Account
          </a>
          <a
            href="#menu"
            className="px-4 py-2 bg-green-600 text-white rounded-full text-center hover:bg-green-700 transition shadow-md"
            onClick={onClose}
          >
            Just Order For Now
          </a>

          {/* Divider with "Or Already have an account?" */}
          <div className="flex items-center my-2">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">
              Or Already have an account?
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-full hover:bg-blue-400 transition shadow-md"
          >
            Login
          </button>
          {/* Registration Modal */}
          {isModalOpen && <RegistrationModal onClose={closeModal} />}
        </div>
      </div>
    </div>
  );
}

"use client";

import ProfileSection from "../account/ProfileInfo";
import AddressSection from "../account//AddressSection";
import PasswordSection from "../account/PasswordSection";

import { useState } from "react";
import { useUser } from "../../context/UserContext";
import Link from "next/link";
export default function AccountPage() {
  const { user, updateUser } = useUser();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!user) return null;

  const handleSave = () => {
    updateUser(form);
    setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <ProfileSection />
        <AddressSection />
        <PasswordSection />
      </div>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

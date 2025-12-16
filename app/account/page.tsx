"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";

export default function AccountPage() {
  const { user } = useUser();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/"); // or /login
    }
  }, [user, router]);

  if (!user) return null; // prevent flicker

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <p>
          <strong>Full Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>

        {user.address && (
          <div className="pt-4 border-t">
            <h2 className="font-semibold mb-2">Address</h2>
            <p>{user.address.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}

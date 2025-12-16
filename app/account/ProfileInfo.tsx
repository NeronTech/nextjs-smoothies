"use client";

import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function ProfileInfo() {
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
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="font-semibold mb-2">User Profile:</h2>
        {!editing ? (
          <>
            <p>
              <strong>Name:</strong> {user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>

            <button
              onClick={() => setEditing(true)}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
            >
              Edit Details
            </button>
          </>
        ) : (
          <>
            <input
              className="w-full border p-2 rounded"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Full Name"
            />

            <input
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />

            <input
              className="w-full border p-2 rounded"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
  );
}

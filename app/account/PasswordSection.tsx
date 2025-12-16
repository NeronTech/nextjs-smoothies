import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function PasswordSection() {
  const { changePassword } = useUser();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = () => {
    setError("");
    setSuccess(false);

    if (newPass.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const ok = changePassword(oldPass, newPass);
    if (!ok) setError("Old password is incorrect");
    else setSuccess(true);
  };

  return (
    <div className="border rounded-xl p-4">
      <h2 className="font-semibold mb-2">Change Password:</h2>

      <input
        type="password"
        placeholder="Old password"
        className="w-full border p-2 rounded mb-2"
        onChange={(e) => setOldPass(e.target.value)}
      />
      <input
        type="password"
        placeholder="New password"
        className="w-full border p-2 rounded mb-2"
        onChange={(e) => setNewPass(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Password updated</p>}

      <button
        onClick={handleChange}
        className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
      >
        Update Password
      </button>
    </div>
  );
}

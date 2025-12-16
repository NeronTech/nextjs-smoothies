import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function AddressSection() {
  const { user, saveUserAddress } = useUser();
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState(user?.address?.address || "");

  if (!user) return null;

  const handleSave = () => {
    saveUserAddress({
      address,
      coordinates: { lat: 0, lng: 0 }, // later from map
    });
    setEditing(false);
  };

  return (
    <div className="border rounded-xl p-4">
      <h2 className="font-semibold mb-2">Address:</h2>

      {!editing ? (
        <>
          <p>{user.address?.address || "No address saved"}</p>
          <button
            onClick={() => setEditing(true)}
            className="text-purple-600 mt-2"
          >
            Edit Address
          </button>
        </>
      ) : (
        <>
          <input
            className="w-full border p-2 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

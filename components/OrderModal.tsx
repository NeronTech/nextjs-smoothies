// components/OrderModal.tsx
"use client";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function OrderModal() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    isOrderModalOpen,
    closeOrderModal,
    openOrderSummary,
    updateItemAddOns,
  } = useCart();

  // Dummy add-on options
  const dummyAddOns = ["Boost Protein", "Honey", "No Sugar"];

  // Local state to store add-ons per item
  const [itemAddOns, setItemAddOns] = useState<Record<string, string[]>>({});

  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setContact(localStorage.getItem("contact") || "");
    setEmail(localStorage.getItem("email") || "");
  }, [isOrderModalOpen]);

  useEffect(() => {
    // Sync each item’s add-ons to the cart context
    Object.entries(itemAddOns).forEach(([itemName, addOns]) => {
      updateItemAddOns(itemName, addOns);
    });
  }, [itemAddOns]);

  if (!isOrderModalOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const toggleAddOn = (itemName: string, addon: string) => {
    setItemAddOns((prev) => {
      const current = prev[itemName] || [];
      const updated = current.includes(addon)
        ? current.filter((a) => a !== addon)
        : [...current, addon];

      return { ...prev, [itemName]: updated };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg">
        <h2 className="text-xl font-bold mb-4">Your Order</h2>

        {cart.length === 0 ? (
          <p className="text-center text-red-500">Your cart is empty</p>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.name + "-" + (item.addOns?.join(",") || "")}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.name)}
                      className="text-red-500 font-bold px-2"
                    >
                      −
                    </button>
                    <p className="font-semibold">{item.quantity}</p>
                    <button
                      onClick={() => increaseQuantity(item.name)}
                      className="text-green-500 font-bold px-2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-semibold">Add-ons:</p>

                  <div className="flex flex-wrap gap-3 mt-1">
                    {dummyAddOns.map((addon) => (
                      <label
                        key={addon}
                        className="flex items-center space-x-1 text-sm border px-2 py-1 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={
                            itemAddOns[item.name]?.includes(addon) || false
                          }
                          onChange={() => toggleAddOn(item.name, addon)}
                        />
                        <span>{addon}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <p className="font-bold text-right">Total: ${total.toFixed(2)}</p>
          </div>
        )}
        <hr />
        <div className="mt-4 flex justify-center">
          <button
            disabled={cart.length === 0}
            onClick={() => {
              if (cart.length === 0) return;
              closeOrderModal();
              openOrderSummary();
            }}
            className={`px-4 py-2 rounded font-semibold hover:bg-blue-700 ${
              cart.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Go to Checkout
          </button>
        </div>

        {/* <div className="mt-4 flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
        </div> */}

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={closeOrderModal}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

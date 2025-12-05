"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    setPhone(sessionStorage.getItem("orderPhone") || "");
    setEmail(sessionStorage.getItem("orderEmail") || "");

    const savedItems = sessionStorage.getItem("orderSummary");
    if (savedItems) {
      setOrderItems(JSON.parse(savedItems));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-3">
          🎉 Order Successful!
        </h1>

        <p className="text-gray-700 mb-4">
          Thank you for your order. We have sent your order summary to:
        </p>

        <div className="text-gray-800 font-medium mb-4">
          {phone && <p>📱 {phone}</p>}
          {email && <p>📧 {email}</p>}
        </div>

        <hr className="my-4" />

        <h2 className="text-lg font-semibold mb-2">Your Order:</h2>

        <div className="text-left">
          {orderItems.map((item: any, index: number) => (
            <div key={index} className="border-b py-2">
              <p className="font-semibold">
                {item.name} × {item.quantity}
              </p>

              {item.addOns && item.addOns.length > 0 && (
                <p className="text-sm text-gray-600">
                  Add-ons: {item.addOns.join(", ")}
                </p>
              )}

              <p className="text-sm text-gray-600">
                ₱{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Menu
        </Link>
      </div>
    </div>
  );
}

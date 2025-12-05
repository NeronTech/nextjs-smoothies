// components/PaymentModal.tsx
"use client";

import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentModal() {
  const { isPaymentModalOpen, closePaymentModal, totalPrice, clearCart, phone, email, cart } =
    useCart();
  const router = useRouter();

  if (!isPaymentModalOpen) return null;

  const openRazorpayCheckout = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: totalPrice * 100, // convert to paise
      currency: "INR",
      name: "Smoothies & More",
      description: "Order Payment",
      handler: function (response: any) {
        console.log("Payment Success: ", response);
        console.log("Payment Success: ", response);

        // Pass phone & email to order-success page
        sessionStorage.setItem("orderPhone", phone || "");
        sessionStorage.setItem("orderEmail", email || "");

        // Pass order summary
        sessionStorage.setItem("orderSummary", JSON.stringify(cart));

        clearCart();
        closePaymentModal();
        router.push("/order-success");
      },
      modal: {
        ondismiss: () => {
          console.log("Razorpay closed");
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    // Ensure Razorpay script is loaded
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">Payment</h2>

        <p className="mb-4">You will pay: ₹{totalPrice}</p>

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={closePaymentModal}
          >
            Close
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={openRazorpayCheckout}
          >
            Pay with Razorpay
          </button>
        </div>
      </div>
    </div>
  );
}

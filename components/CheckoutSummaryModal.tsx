"use client";

import { useCart } from "../context/CartContext";

export default function CheckoutSummaryModal() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    address,
    phone,
    email,
    closeCheckoutSummary,
    isCheckoutSummaryModalOpen,
    openOrderAddressModal,
    saveAddress,
  } = useCart();

  if (!isCheckoutSummaryModalOpen) return null;

  const TAX_RATE = 0.12; // 12% tax
  const DELIVERY_CHARGE = 50; // flat delivery fee

  const tax = totalPrice * TAX_RATE;
  const grandTotal = totalPrice + tax + DELIVERY_CHARGE;

  /** Edit address handler */
  const handleEditAddress = () => {
    closeCheckoutSummary(); // close current summary
    openOrderAddressModal(); // open address modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Checkout Summary</h2>

        {/* Order Items */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          {cart.length === 0 && <p>No items in cart.</p>}
          {cart.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center mb-1"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <div className="flex space-x-1 mt-1">
                  <button
                    onClick={() => decreaseQuantity(item.name)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.name)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <span>₱{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr />

        {/* Address */}
        <div className="mb-4 mt-2">
          <h3 className="font-semibold mb-1 flex justify-between items-center">
            Delivery Address
            <button
              className="text-blue-500 underline text-sm"
              onClick={handleEditAddress}
            >
              Edit
            </button>
          </h3>
          <p>{address?.address || "No address selected"}</p>
        </div>

        {/* Contact */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Contact</h3>
          <p>{phone || email || "No contact info"}</p>
        </div>

        {/* Charges */}
        <div className="mb-4 border-t pt-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₱{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (12%):</span>
            <span>₱{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>₱{DELIVERY_CHARGE.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Grand Total:</span>
            <span>₱{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={closeCheckoutSummary}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => {
              alert("Order placed!"); // Replace with real checkout logic
              closeCheckoutSummary();
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

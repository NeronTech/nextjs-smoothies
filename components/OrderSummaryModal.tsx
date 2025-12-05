"use client";
import { useCart } from "../context/CartContext";

export default function OrderSummaryModal() {
  const {
    cart,
    isSummaryModalOpen,
    closeOrderSummary,
    openOrderModal,
    openValidationModal,
  } = useCart();

  if (!isSummaryModalOpen) return null;

  // Dummy fees
  const taxRate = 0.1;
  const adminFee = 5.0;
  const deliveryFee = 3.5;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * taxRate;
  const total = subtotal + tax + adminFee + deliveryFee;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {/* Cart Items */}
        <div className="space-y-2">
          {cart.map((item) => (
            <div key={item.name} className="border-b pb-2">
              <p className="font-semibold">
                {item.name} × {item.quantity}
              </p>
              {item.addOns && item.addOns.length > 0 && (
                <p className="text-sm text-mute">
                  Add-ons: <b>{item.addOns.join(", ")}</b>
                </p>
              )}
              <p className="text-gray-500 text-sm">
                ${item.price.toFixed(2)} each
              </p>
            </div>
          ))}
        </div>

        {/* Fees */}
        <div className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Admin Fee:</span>
            <span>${adminFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={closeOrderSummary}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Close
          </button>

          <button
            onClick={() => {
              closeOrderSummary();
              openOrderModal();
            }}
            className="px-4 py-2 bg-blue-400 text-white rounded font-semibold hover:bg-blue-500"
          >
            Modify Order
          </button>

          <button
            onClick={() => {
              closeOrderSummary();
              openValidationModal();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

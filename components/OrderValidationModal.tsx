"use client";
import { useCart } from "../context/CartContext";
import { useForm } from "react-hook-form";

interface FormData {
  phone: string;
  email?: string;
}

export default function OrderValidation() {
  const {
    isValidationModalOpen, // dedicated state
    closeValidationModal,
    openOtpModal,
    generateOtp,
  } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    generateOtp(data.phone, data.email);
    closeValidationModal();
    openOtpModal();
  };

  if (!isValidationModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md animate-fadeIn">
        <h2 className="text-md font-bold mb-4">Enter Contact Info : Phone or Email</h2>
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: true, pattern: /^\d{10}$/ })}
            className="border p-2 rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">Valid phone required</p>
          )}

          <input
            type="email"
            placeholder="Email (optional)"
            {...register("email", {
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}
            className="border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Invalid email</p>
          )}

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={closeValidationModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

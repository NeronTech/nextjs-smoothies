// components/OtpModal.tsx
"use client";
import { useCart } from "../context/CartContext";
import { useForm } from "react-hook-form";

interface OtpFormData {
  otp: string;
}

export default function OtpModal() {
  const {
    isOtpModalOpen,
    closeOtpModal,
    phone,
    email,
    validateOtp,
    generateOtp,
  } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>();

  const onSubmit = (data: OtpFormData) => {
    if (!validateOtp(data.otp)) alert("Invalid OTP");
  };

  if (!isOtpModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md animate-fadeIn">
        <h2 className="text-xl font-bold mb-2">Enter OTP</h2>
        <p className="text-sm text-gray-500 mb-4">
          OTP sent to {phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-XXX-$3")}
          {email ? ` and ${email.replace(/(.{2}).*(@.*)/, "$1***$2")}` : ""}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <input
            type="text"
            placeholder="Enter OTP"
            {...register("otp", { required: true, pattern: /^\d{6}$/ })}
            className="border p-2 rounded"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm">6-digit OTP required</p>
          )}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => closeOtpModal()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-400 text-white rounded"
              onClick={() => generateOtp(phone, email)}
            >
              Resend OTP
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

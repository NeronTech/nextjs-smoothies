"use client";

import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import Toast from "./Toast";

interface RegistrationModalProps {
  onClose: () => void;
}

export default function RegistrationModal({ onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    matchPassword: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    matchPassword: "",
  });

  const [step, setStep] = useState("form");

  const { registerUser } = useUser();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // OTP states
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtpInput, setMobileOtpInput] = useState("");
  const [emailOtpInput, setEmailOtpInput] = useState("");

  // Regex validations
  const phoneRegex = /^(?:\+91[- ]?|0)?[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: phoneRegex.test(value) ? "" : "Invalid Indian mobile number",
      }));
    }

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Invalid email address",
      }));
    }

    if (name === "password" || name === "matchPassword") {
      setErrors((prev) => ({
        ...prev,
        matchPassword:
          name === "matchPassword" || name === "password"
            ? formData.password === value || formData.matchPassword === value
              ? ""
              : "Passwords do not match"
            : prev.matchPassword,
      }));
    }
  };

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.phone || errors.email || errors.matchPassword) {
      alert("Please fix errors before submitting.");
      return;
    }

    const otp = generateOtp();
    setMobileOtp(otp);

    console.log("📱 Mobile OTP (client simulation):", otp);

    setStep("mobileOtp");
  };

  const verifyMobileOtp = () => {
    if (mobileOtpInput === mobileOtp) {
      const newEmailOtp = generateOtp();
      setEmailOtp(newEmailOtp);

      console.log("📧 Email OTP (client simulation):", newEmailOtp);

      setStep("emailOtp");
    } else {
      alert("Incorrect Mobile OTP");
    }
  };

  const verifyEmailOtp = () => {
    if (emailOtpInput === emailOtp) {
      const userData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };

      // Save globally
      registerUser(userData);

      // alert("Registration Successful!");
      showToast("Registration Successful!", "success");

      onClose();
    } else {
      // alert("Incorrect Email OTP");
      showToast("Incorrect Email OTP", "error");
    }
  };

  return (
    <>
      {/* ------------------ MAIN REGISTRATION MODAL ------------------ */}
      {step === "form" && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-xl">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              Create Account
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`mt-1 w-full border rounded-md px-3 py-2 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`mt-1 w-full border rounded-md px-3 py-2 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center my-3">
                <hr className="flex-grow border-gray-300" />
                <span className="px-2 text-sm text-gray-500">
                  Login Details
                </span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Username */}
              <div>
                <label className="text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* Re-type */}
              <div>
                <label className="text-sm font-medium">Re-type Password</label>
                <input
                  type="password"
                  name="matchPassword"
                  value={formData.matchPassword}
                  onChange={handleChange}
                  required
                  className={`mt-1 w-full border rounded-md px-3 py-2 ${
                    errors.matchPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.matchPassword && (
                  <p className="text-red-500 text-xs">{errors.matchPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------------------ MOBILE OTP MODAL ------------------ */}
      {step === "mobileOtp" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl w-80 text-center shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Verify Mobile Number</h3>
            <p className="text-gray-600 text-sm mb-4">
              Please enter the OTP sent to your mobile.
            </p>

            <input
              type="text"
              value={mobileOtpInput}
              onChange={(e) => setMobileOtpInput(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Enter OTP"
            />

            <button
              onClick={verifyMobileOtp}
              className="w-full py-2 bg-purple-600 text-white rounded"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}

      {/* ------------------ EMAIL OTP MODAL ------------------ */}
      {step === "emailOtp" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl w-80 text-center shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Verify Email</h3>
            <p className="text-gray-600 text-sm mb-4">
              Please enter the OTP sent to your email.
            </p>

            <input
              type="text"
              value={emailOtpInput}
              onChange={(e) => setEmailOtpInput(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Enter OTP"
            />

            <button
              onClick={verifyEmailOtp}
              className="w-full py-2 bg-green-600 text-white rounded"
            >
              Verify Email OTP
            </button>
          </div>
        </div>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

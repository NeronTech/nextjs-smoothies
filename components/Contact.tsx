"use client";

import { useState } from "react";

const GAS_URL = "https://script.google.com/macros/s/AKfycbwvoMt2Tz3JSdWwo29cod-ru0XpGp3IDxZ5xnd-CAVZ4lc4joD8SBnKGeDKMcgRVwi6/exec"; // replace with your GAS URL

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill all required fields."); // or use your showToast
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "contact-us", name, email, message }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      console.log(data);

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent. We will get back to you soon!"); // showToast replacement
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      alert("❌ Request failed: " + err.message); // showMsg replacement
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-br from-purple-50 to-pink-50"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Get in Touch with{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Smoothies & More
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            We’d love to hear from you or see you in person!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start delay-200">
          {/* Contact Form */}
          <div className="bg-white shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-500">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Contact Us
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  {status === "sending"
                    ? "Sending..."
                    : status === "success"
                    ? "Sent!"
                    : status === "error"
                    ? "Failed"
                    : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Visit Us */}
          <div className="bg-white shadow-xl rounded-2xl p-4 hover:shadow-2xl transition-shadow duration-500">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Visit Us
            </h3>
            <div className="space-y-2 text-center md:text-left">
              <p className="text-lg font-semibold text-gray-800">
                Smoothies & More
              </p>
              <p className="text-gray-600">
                123 Flavor Street, Foodie City, FC 12345
              </p>
              <p className="text-gray-600">
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="text-purple-600 hover:text-pink-600 font-medium transition"
                >
                  +1 (234) 567-890
                </a>
              </p>
              <p className="text-gray-600">
                Email:{" "}
                <a
                  href="mailto:info@smoothiesmore.com"
                  className="text-purple-600 hover:text-pink-600 font-medium transition"
                >
                  info@smoothiesmore.com
                </a>
              </p>
              <p className="text-gray-600">
                Hours:{" "}
                <span className="font-medium text-gray-800">
                  8:00 AM – 8:00 PM daily
                </span>
              </p>
              <div className="mt-2 w-full h-64 rounded-xl overflow-hidden shadow-md border border-gray-200">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  className="rounded-xl"
                  src="https://www.google.com/maps?q=40.0076,-105.2659&hl=en&z=15&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

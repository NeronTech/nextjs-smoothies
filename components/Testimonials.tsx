"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: "testimonial1",
    quote:
      "Smoothies and More has completely transformed my morning routine. The Green Goddess smoothie gives me the energy I need for my workouts!",
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    imageUrl:
      "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20happy%20young%20woman%20with%20blonde%20hair&width=100&height=100&seq=testimonial1&orientation=squarish",
    rating: 5,
  },
  {
    id: "testimonial2",
    quote:
      "The smoothies are fresh, delicious, and give me the perfect boost during my busy workday!",
    name: "Michael Lee",
    role: "Software Engineer",
    imageUrl:
      "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20happy%20young%20man%20with%20short%20brown%20hair&width=100&height=100&seq=testimonial2&orientation=squarish",
    rating: 5,
  },
  // add more testimonials here
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate the carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  const selectDot = (index: number) => setActiveIndex(index);

  return (
    <section
      id="testimonials"
      className="w-full relative min-h-screen flex items-center justify-center py-6 bg-white mb-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6 hover:scale-110 transition-transform duration-300">
            <i className="ri-heart-line text-2xl text-purple-600"></i>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by you,
            <br />
            trusted{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative">
              by thousands
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about their Smoothies and More experience
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto group overflow-hidden">
          {testimonialsData.map((t, idx) => (
            <div
              key={t.id}
              className={`testimonial-slide transition-opacity duration-1000 ease-in-out text-center ${
                idx === activeIndex
                  ? "opacity-100 relative"
                  : "opacity-0 absolute top-0 left-0 w-full"
              }`}
            >
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-lg flex flex-col items-center justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                  <i className="ri-double-quotes-l text-2xl text-white"></i>
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "{t.quote}"
                </blockquote>
                <div className="flex justify-center items-center mb-6 space-x-1 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <i key={i} className="ri-star-fill text-xl"></i>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover hover:scale-110 transition-transform duration-300"
                    src={t.imageUrl}
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {t.name}
                    </h4>
                    <p className="text-gray-600">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                className={`dot w-3 h-3 rounded-full transition-all ${
                  idx === activeIndex
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => selectDot(idx)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

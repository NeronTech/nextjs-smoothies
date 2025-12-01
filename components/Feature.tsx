"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const features = [
  { id: "ingredients", label: "Fresh Ingredients", icon: "ri-leaf-line" },
  { id: "delivery", label: "Quick Delivery", icon: "ri-truck-line" },
  { id: "custom", label: "Custom Blends", icon: "ri-settings-3-line" },
  { id: "nutrition", label: "Nutritional Info", icon: "ri-heart-pulse-line" },
  { id: "eco", label: "Eco-Friendly", icon: "ri-recycle-line" },
];

export default function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState("nutrition");

  const cards: Record<string, any> = {
    ingredients: {
      title: "Fresh Ingredients",
      desc: "We source the freshest fruits and vegetables to ensure every sip is full of flavor and nutrition.",
      img: "https://picsum.photos/seed/ingredients/400/300",
      gradient: "from-green-50 to-white",
      iconBg: "from-green-500 to-emerald-500",
      icon: "ri-leaf-line",
    },
    delivery: {
      title: "Quick Delivery",
      desc: "Your order arrives fresh and fast—because healthy choices should never wait!",
      img: "https://picsum.photos/seed/delivery/400/300",
      gradient: "from-blue-50 to-white",
      iconBg: "from-blue-500 to-sky-500",
      icon: "ri-truck-line",
    },
    custom: {
      title: "Custom Blends",
      desc: "Build your smoothie just the way you like it—choose your base, fruits, and toppings.",
      img: "https://picsum.photos/seed/custom/400/300",
      gradient: "from-yellow-50 to-white",
      iconBg: "from-yellow-500 to-orange-400",
      icon: "ri-settings-3-line",
    },
    nutrition: {
      title: "Nutritional Info",
      desc: "Complete nutritional breakdown for every item. Track your health goals with confidence.",
      img: "https://picsum.photos/seed/nutrition/400/300",
      gradient: "from-gray-50 to-white",
      iconBg: "from-red-500 to-orange-500",
      icon: "ri-heart-pulse-line",
    },
    eco: {
      title: "Eco-Friendly",
      desc: "We use biodegradable cups, eco-safe packaging, and sustainable sourcing practices.",
      img: "https://picsum.photos/seed/eco/400/300",
      gradient: "from-emerald-50 to-white",
      iconBg: "from-emerald-500 to-green-400",
      icon: "ri-recycle-line",
    },
  };

  // Auto-next feature every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = features.findIndex((f) => f.id === activeFeature);
      const nextIndex = (currentIndex + 1) % features.length;
      setActiveFeature(features[nextIndex].id);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeFeature]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6 hover:scale-110 transition-transform duration-300 rotate-[50deg]">
            <i className="ri-star-line text-2xl text-purple-600"></i>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Keep everything
            <br />
            in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative">
              one place
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping scale-90"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for a healthy lifestyle, delivered fresh to your
            door
          </p>
        </div>

        {/* Feature Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center space-x-2 bg-gray-100 rounded-full p-1">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`feature-btn px-4 py-2 rounded-full text-sm font-medium transition-transform duration-300 flex items-center ${
                  activeFeature === feature.id
                    ? "text-purple-600 bg-white shadow-sm"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                <i className={`${feature.icon} mr-2`}></i>
                {feature.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-4xl mx-auto relative">
          {features.map((feature) => {
            const card = cards[feature.id];
            return (
              <div
                key={feature.id}
                className={`feature-card transition-opacity duration-700 ${
                  activeFeature === feature.id
                    ? "opacity-100 block"
                    : "opacity-0 hidden"
                }`}
              >
                <div
                  className={`bg-gradient-to-br ${card.gradient} rounded-3xl p-8 md:p-12 shadow-xl`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 ${card.iconBg} rounded-2xl mb-6`}
                      >
                        <i className={`${card.icon} text-8xl text-black`}></i>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {card.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6">{card.desc}</p>
                    </div>
                    <div className="relative w-full h-64 lg:h-80">
                      <Image
                        src={card.img}
                        alt={card.title}
                        fill
                        className="object-cover rounded-2xl transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

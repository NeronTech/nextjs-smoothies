'use client';
import { useState } from "react";

export default function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState("nutrition");

  const features = [
    { id: "ingredients", label: "Fresh Ingredients", icon: "ri-leaf-line" },
    { id: "delivery", label: "Quick Delivery", icon: "ri-truck-line" },
    { id: "custom", label: "Custom Blends", icon: "ri-settings-3-line" },
    { id: "nutrition", label: "Nutritional Info", icon: "ri-heart-pulse-line" },
    { id: "eco", label: "Eco-Friendly", icon: "ri-recycle-line" },
  ];

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
          {/* Feature Cards */}
          {features.map((feature) => {
            const cards = {
              ingredients: {
                title: "Fresh Ingredients",
                desc: "We source the freshest fruits and vegetables to ensure every sip is full of flavor and nutrition.",
                img: "https://readdy.ai/api/search-image?query=Fresh%20organic%20fruits%20and%20vegetables%20arranged%20beautifully%20on%20a%20wooden%20cutting%20board%2C%20vibrant%20colors%2C%20natural%20lighting%2C%20healthy%20ingredients%20for%20smoothies%2C%20clean%20background%2C%20professional%20food%20photography%2C%20high%20quality%2C%20appetizing%20presentation&width=400&height=300&seq=feature1&orientation=landscape",
                gradient: "from-green-50 to-white",
                iconBg: "from-green-500 to-emerald-500",
                icon: "ri-leaf-line",
              },
              delivery: {
                title: "Quick Delivery",
                desc: "Your order arrives fresh and fast—because healthy choices should never wait!",
                img: "https://readdy.ai/api/search-image?query=Modern%20delivery%20service%20with%20fresh%20smoothies%20in%20eco-friendly%20packaging%2C%20delivery%20person%20on%20bicycle%2C%20urban%20setting%2C%20professional%20service%2C%20clean%20and%20modern%20aesthetic%2C%20high%20quality%20photography&width=400&height=300&seq=feature2&orientation=landscape",
                gradient: "from-blue-50 to-white",
                iconBg: "from-blue-500 to-sky-500",
                icon: "ri-truck-line",
              },
              custom: {
                title: "Custom Blends",
                desc: "Build your smoothie just the way you like it—choose your base, fruits, and toppings.",
                img: "https://readdy.ai/api/search-image?query=Colorful%20smoothie%20ingredients%20laid%20out%20for%20customization%2C%20various%20fruits%2C%20vegetables%2C%20protein%20powders%2C%20superfoods%2C%20organized%20display%2C%20bright%20clean%20background%2C%20professional%20food%20styling&width=400&height=300&seq=feature3&orientation=landscape",
                gradient: "from-yellow-50 to-white",
                iconBg: "from-yellow-500 to-orange-400",
                icon: "ri-settings-3-line",
              },
              nutrition: {
                title: "Nutritional Info",
                desc: "Complete nutritional breakdown for every item. Track your health goals with confidence.",
                img: "https://readdy.ai/api/search-image?query=Healthy%20smoothie%20with%20nutritional%20information%20display%2C%20calories%20and%20vitamins%20shown%2C%20health-focused%20presentation%2C%20clean%20modern%20design%2C%20professional%20food%20photography%2C%20wellness%20theme&width=400&height=300&seq=feature4&orientation=landscape",
                gradient: "from-gray-50 to-white",
                iconBg: "from-red-500 to-orange-500",
                icon: "ri-heart-pulse-line",
              },
              eco: {
                title: "Eco-Friendly",
                desc: "We use biodegradable cups, eco-safe packaging, and sustainable sourcing practices.",
                img: "https://readdy.ai/api/search-image?query=Eco-friendly%20smoothie%20packaging%20made%20from%20sustainable%20materials%2C%20biodegradable%20cups%20and%20straws%2C%20green%20environmental%20theme%2C%20clean%20modern%20design%2C%20professional%20product%20photography&width=400&height=300&seq=feature5&orientation=landscape",
                gradient: "from-emerald-50 to-white",
                iconBg: "from-emerald-500 to-green-400",
                icon: "ri-recycle-line",
              },
            };
            const card = (cards as any)[feature.id];
            return (
              <div
                key={feature.id}
                className={`feature-card transition-all duration-500 ${
                  activeFeature === feature.id ? "block" : "hidden"
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
                        <i className={`${card.icon} text-2xl text-white`}></i>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {card.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6">{card.desc}</p>
                    </div>
                    <div>
                      <img
                        alt={card.title}
                        className="w-full h-full object-cover transition-all duration-500"
                        src={card.img}
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

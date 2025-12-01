"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwvoMt2Tz3JSdWwo29cod-ru0XpGp3IDxZ5xnd-CAVZ4lc4joD8SBnKGeDKMcgRVwi6/exec";

interface MenuItem {
  name: string;
  price: string | number;
  description?: string;
  imageUrl?: string;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export default function MenuSection() {
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToCart } = useCart();

  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await fetch(GAS_URL);
        const data = await res.json();
        console.log("GAS DATA:", data);

        setMenuData(
          Array.isArray(data[0]?.items) ? data : [{ name: "Menu", items: data }]
        );
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const formatPrice = (price: string | number): string =>
    parseFloat(String(price)).toFixed(2);

  const scroll = (categoryId: string, direction: "left" | "right") => {
    const container = scrollRefs.current[categoryId];
    if (!container) return;

    container.scrollBy({
      left:
        direction === "left"
          ? -container.clientWidth * 0.6
          : container.clientWidth * 0.6,
      behavior: "smooth",
    });
  };

  if (loading) return <p className="text-center py-10">Loading menu...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Failed to load menu.</p>
    );

  return (
    <section
      id="menu"
      className="w-full relative min-h-screen py-16 bg-gradient-to-br from-purple-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Menu</h2>

        {menuData.map((category) => {
          const safeId = category.name.replace(/\s+/g, "-").toLowerCase();

          return (
            <div key={safeId} className="w-full text-center mb-12">
              <p className="text-2xl font-semibold mb-4 text-gray-800">
                {category.name}
              </p>

              <div className="relative flex items-center justify-center group">
                {/* Left Arrow */}
                <button
                  onClick={() => scroll(safeId, "left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
                >
                  &#8592;
                </button>

                {/* Scroll Container */}
                <div
                  ref={(el) => {
                    if (el) scrollRefs.current[safeId] = el;
                  }}
                  className="flex overflow-x-auto gap-4 px-2 scroll-smooth snap-x snap-mandatory"
                >
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transform hover:-translate-y-1 transition snap-center min-w-[200px]"
                    >
                      <div className="relative h-40 w-full">
                        <Image
                          src={
                            item.imageUrl ||
                            "https://via.placeholder.com/400x300"
                          }
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-lg mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm flex-grow">
                          {item.description}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-bold text-indigo-600">
                            ${formatPrice(item.price)}
                          </span>
                          <button
                            onClick={() =>
                              addToCart({
                                ...item,
                                price: parseFloat(String(item.price)),
                              })
                            }
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => scroll(safeId, "right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
                >
                  &#8594;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

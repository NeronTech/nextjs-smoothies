'use client';
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className="site-header bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3">
            <img
              alt="Smoothies & More Logo"
              src="https://nerontech.github.io/sandeep/icons/windows11/LargeTile.scale-400.png"
              className="h-10 w-auto sm:h-12 transition-all duration-200"
              loading="lazy"
            />
            <div className="flex flex-col leading-tight">
              <span
                className="text-lg sm:text-xl font-bold text-gray-900"
                style={{ fontFamily: "Pacifico, serif" }}
              >
                Smoothies & More
              </span>
              <span className="text-[10px] sm:text-xs text-gray-600 font-medium -mt-0.5">
                Home of Delicious Smoothies & Snacks
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-orange-600 transition"
            >
              Home
            </a>
            <a
              href="#menu"
              className="text-gray-700 hover:text-orange-600 transition"
            >
              Menu
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-orange-600 transition"
            >
              Contact Us
            </a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              id="cartBtn"
              className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-4 py-2 rounded-full text-sm transition"
            >
              <i className="ri-shopping-cart-line mr-2"></i> Cart (
              <span id="cartCount">0</span>)
            </button>
            <a href="#menu" data-discover="true">
              <button className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-full text-sm transition">
                Order Now
              </button>
            </a>
          </div>

          {/* Mobile Buttons */}
          <button
            id="cartBtnMobile"
            className="md:hidden inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-full text-xs transition mx-auto"
          >
            <i className="ri-shopping-cart-line mr-1"></i>
            Cart (<span id="cartCountMobile">0</span>)
          </button>

          <button
            id="mobile-menu-button"
            className="md:hidden p-2"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <span className="block h-0.5 w-6 bg-gray-900"></span>
              <span className="block h-0.5 w-6 bg-gray-900"></span>
              <span className="block h-0.5 w-6 bg-gray-900"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav id="mobile-menu" className="md:hidden px-4 pb-4 space-y-2">
          <a
            href="#home"
            className="block text-gray-700 hover:text-orange-600 transition"
          >
            Home
          </a>
          <a
            href="#menu"
            className="block text-gray-700 hover:text-orange-600 transition"
          >
            Menu
          </a>
          <a
            href="#contact"
            className="block text-gray-700 hover:text-orange-600 transition"
          >
            Contact Us
          </a>
          <div className="pt-4 border-t border-gray-200">
            <a href="#menu" data-discover="true">
              <button className="w-full mt-2 inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-full text-sm transition">
                Order Now
              </button>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

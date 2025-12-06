// components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import LoginModal from "./LoginModal";
import { useUser } from "../context/UserContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openOrderModal } = useCart();
  const { showToast } = useToast();
  const [showLogin, setShowLogin] = useState(false);
  const { user, loadUser, logout } = useUser();

  // Optional: Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleCartClick = () => {
    // Close mobile menu if open
    setMobileMenuOpen(false);
    if (cartCount === 0) {
      showToast("Your cart is empty!", "error"); // <-- Works globally!
    } else {
      openOrderModal();
    }
  };

  return (
    <>
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
              {/* Desktop Cart Button */}
              <button
                className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-4 py-2 rounded-full text-sm transition"
                onClick={handleCartClick}
              >
                <i className="ri-shopping-cart-line mr-2"></i> Cart ({cartCount}
                )
              </button>

              <a href="#menu" data-discover="true">
                <button className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-full text-sm transition">
                  Order Now
                </button>
              </a>
            </div>

            {/* Mobile Buttons */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-full text-xs transition"
                onClick={handleCartClick}
              >
                <i className="ri-shopping-cart-line mr-1"></i> Cart ({cartCount}
                )
              </button>

              <button
                id="mobile-menu-button"
                className="p-2"
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
            {user ? (
              <button
                className="block text-gray-700 hover:text-orange-600 transition"
                onClick={() => {
                  logout(); // clears state and localStorage
                  toggleMobileMenu();
                }}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true), toggleMobileMenu();
                }}
                className="block text-gray-700 hover:text-orange-600 transition"
              >
                Login
              </button>
            )}
          </nav>
        )}
        {/* Registered User Details */}
        {user && (
          <div className="flex flex-col items-end text-right space-x-3 pr-6">
            <span className="text-gray-800 text-xs">
              Hello, <b>{user.fullName.split(" ")[0]}!</b>
            </span>
          </div>
        )}
      </header>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

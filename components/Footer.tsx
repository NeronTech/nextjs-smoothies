"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <div className="text-center md:text-left">
          &copy; 2025 Smoothies and More. All rights reserved.
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 justify-center md:justify-end">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-white transition-colors"
          >
            <i className="ri-facebook-fill text-2xl"></i>
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-white transition-colors"
          >
            <i className="ri-twitter-fill text-2xl"></i>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <i className="ri-instagram-fill text-2xl"></i>
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <i className="ri-linkedin-fill text-2xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

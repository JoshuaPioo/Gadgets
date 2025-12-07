import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaShoppingBag } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-pink-600 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaShoppingBag size={28} />
            <h2 className="text-xl font-bold">GadgetStore</h2>
          </div>
          <p className="text-sm text-pink-100">
            Your trusted online gadget shop. Quality products, fast delivery, and the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/profile" className="hover:underline">Profile</a></li>
            <li><a href="/cart" className="hover:underline">Cart</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Shipping Info</a></li>
            <li><a href="#" className="hover:underline">Return & Refund</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-4 text-white">
            <a href="#" className="p-3 bg-pink-500 hover:bg-pink-700 rounded-full transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-3 bg-pink-500 hover:bg-pink-700 rounded-full transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-3 bg-pink-500 hover:bg-pink-700 rounded-full transition">
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-xs text-pink-100">
        © {new Date().getFullYear()} GadgetStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

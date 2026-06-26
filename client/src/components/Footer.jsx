import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaPaperPlane } from "react-icons/fa";

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
  };

  return (
    <footer className="bg-white border-t border-zinc-100/80 pt-16 pb-8 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand details */}
        <div className="flex flex-col gap-3">
          <Link to="/">
            <h1 className="font-bold text-base sm:text-lg tracking-tight flex items-center mb-1">
              <span className="text-zinc-900 font-extrabold">ABDULLAH</span>
              <span className="text-zinc-400 font-light ml-1">ESTATE</span>
            </h1>
          </Link>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium max-w-[240px]">
            A premium, glass-themed marketplace dedicated to matching users with their perfect properties globally.
          </p>
        </div>

        {/* Explore Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
            Explore
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
            <li>
              <Link to="/search" className="hover:text-zinc-900 transition-colors">
                Search Properties
              </Link>
            </li>
            <li>
              <Link to="/search?type=rent" className="hover:text-zinc-900 transition-colors">
                Rentals
              </Link>
            </li>
            <li>
              <Link to="/search?type=sale" className="hover:text-zinc-900 transition-colors">
                Sales
              </Link>
            </li>
            <li>
              <Link to="/search?offer=true" className="hover:text-zinc-900 transition-colors">
                Featured Deals
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
            Company
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
            <li>
              <Link to="/about" className="hover:text-zinc-900 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <span className="cursor-not-allowed hover:text-zinc-950 transition-colors">
                Careers
              </span>
            </li>
            <li>
              <span className="cursor-not-allowed hover:text-zinc-950 transition-colors">
                Pressroom
              </span>
            </li>
            <li>
              <span className="cursor-not-allowed hover:text-zinc-950 transition-colors">
                Blog Articles
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
            Newsletter
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            Join our weekly digest for recent property entries and market stats.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full mt-1">
            <input
              type="email"
              placeholder="Email address"
              className="border border-zinc-200 rounded-xl px-3 py-2 text-xs w-full focus:outline-none focus:border-zinc-400 bg-zinc-50 shadow-inner"
              required
            />
            <button
              type="submit"
              className="bg-zinc-900 hover:bg-zinc-950 text-white rounded-xl p-2.5 px-4 cursor-pointer transition shadow-sm"
            >
              <FaPaperPlane className="text-xs" />
            </button>
          </form>
        </div>
      </div>

      {/* Social contacts & copyright bottom */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center border-t border-zinc-100 mt-14 pt-8 gap-4">
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          © {new Date().getFullYear()} ABDULLAH ESTATE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-5 text-zinc-400 text-sm">
          <span className="hover:text-zinc-900 transition-colors cursor-pointer">
            <FaFacebook />
          </span>
          <span className="hover:text-zinc-900 transition-colors cursor-pointer">
            <FaTwitter />
          </span>
          <span className="hover:text-zinc-900 transition-colors cursor-pointer">
            <FaInstagram />
          </span>
          <span className="hover:text-zinc-900 transition-colors cursor-pointer">
            <FaGithub />
          </span>
        </div>
      </div>
    </footer>
  );
}

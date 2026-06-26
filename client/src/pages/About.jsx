import React from "react";

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-slate-800 text-center md:text-left">
        About <span className="text-slate-500">Abdullah Estate</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6 items-center">
        {/* Story details */}
        <div className="flex flex-col gap-4 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Welcome to Abdullah Estate, your premier destination for modern,
            reliable, and hassle-free real estate services. We specialize in
            connecting sellers, landlords, buyers, and tenants to make housing
            transitions as seamless as possible. Our user-centric online
            marketplace allows you to browse, search, create, update, and manage
            premium listings in just a few clicks.
          </p>
          <p>
            Whether you are listing a cozy apartment for rent or looking to
            purchase your next dream home, Abdullah Estate provides high-end tools
            and clean user interfaces to simplify the process. Our mission is to
            bring absolute transparency, security, and velocity to real estate
            interactions.
          </p>
          <p>
            Equipped with multi-criteria searches, visual gallery sliders, and
            direct landlord contact utilities, we ensure you have everything needed
            to make the right housing choice. Thank you for joining our community!
          </p>
        </div>

        {/* Feature stats showcase */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-700">10k+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Properties Listed</span>
          </div>
          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-700">5k+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Happy Clients</span>
          </div>
          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-700">150+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Cities Covered</span>
          </div>
          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-700">24/7</span>
            <span className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Active Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}

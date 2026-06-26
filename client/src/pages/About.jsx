import React from "react";

export default function About() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto flex flex-col gap-8 bg-fafafa">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight text-center md:text-left">
        About <span className="text-zinc-400 font-light">Abdullah Estate</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6 items-center">
        {/* Story details */}
        <div className="flex flex-col gap-5 text-zinc-500 leading-relaxed text-sm sm:text-base font-medium">
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
        <div className="grid grid-cols-2 gap-6">
          <div className="p-8 bg-white border border-zinc-100/80 rounded-3xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col justify-center items-center text-center hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.06)] transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-zinc-800 tracking-tight">10k+</span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1.5">Properties</span>
          </div>
          <div className="p-8 bg-white border border-zinc-100/80 rounded-3xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col justify-center items-center text-center hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.06)] transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-zinc-800 tracking-tight">5k+</span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1.5">Happy Clients</span>
          </div>
          <div className="p-8 bg-white border border-zinc-100/80 rounded-3xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col justify-center items-center text-center hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.06)] transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-zinc-800 tracking-tight">150+</span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1.5">Cities</span>
          </div>
          <div className="p-8 bg-white border border-zinc-100/80 rounded-3xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col justify-center items-center text-center hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.06)] transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-zinc-800 tracking-tight">24/7</span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1.5">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}

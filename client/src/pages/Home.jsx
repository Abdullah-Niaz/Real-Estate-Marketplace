import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  const nextSlide = () => {
    if (offerListings.length > 0) {
      setCurrentSlide((prev) => (prev === offerListings.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (offerListings.length > 0) {
      setCurrentSlide((prev) => (prev === 0 ? offerListings.length - 1 : prev - 1));
    }
  };

  return (
    <div className="pb-20 bg-fafafa min-h-screen">
      {/* Stunning Hero Section */}
      <div className="flex flex-col lg:flex-row gap-12 py-20 px-6 max-w-6xl mx-auto items-center justify-between">
        {/* Left Column */}
        <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
          <h1 className="text-zinc-900 font-extrabold text-4xl sm:text-6xl tracking-tight leading-[1.1]">
            Find your next <br />
            <span className="text-zinc-400 font-light">perfect space</span> with ease
          </h1>
          <div className="text-zinc-500 text-sm sm:text-base font-medium max-w-lg leading-relaxed">
            Abdullah Estate is the best place to find your next perfect place to live.
            We offer a curated selection of premium properties tailored for you.
          </div>
          <Link
            to={"/search"}
            className="text-xs font-bold uppercase tracking-widest text-white bg-zinc-900 hover:bg-zinc-950 px-7 py-4 rounded-xl shadow-sm transition duration-300 self-center lg:self-start mt-2 cursor-pointer"
          >
            Explore Properties
          </Link>
        </div>

        {/* Right Column - Visual Showcase */}
        <div className="relative flex-1 w-full max-w-lg lg:max-w-none group cursor-pointer mt-8 lg:mt-0">
          {/* Glowing linear gradient behind the glass card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-amber-500/20 rounded-[2.5rem] blur-2xl group-hover:opacity-40 transition duration-1000 group-hover:duration-300"></div>
          
          {/* Glass frame */}
          <div className="relative bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-[2.5rem] shadow-xl overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out">
            <div className="relative overflow-hidden rounded-[1.8rem] h-[280px] sm:h-[380px]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Stunning modern glass mansion"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              {/* Floating overlay price badge */}
              <div className="absolute bottom-5 left-5 bg-zinc-950/80 backdrop-blur-md border border-white/10 text-white rounded-2xl p-4 shadow-lg flex flex-col gap-0.5 z-20">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Featured Mansion</span>
                <span className="text-xs sm:text-sm font-extrabold tracking-tight">The Glass Residence</span>
                <span className="text-[11px] font-bold text-amber-400 mt-1">$4,850,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Slide Showcase */}
      {offerListings && offerListings.length > 0 && (
        <div className="relative w-full h-[320px] sm:h-[550px] overflow-hidden bg-zinc-950 group my-8 max-w-6xl mx-auto rounded-3xl shadow-sm border border-zinc-100/10">
          {offerListings.map((listing, index) => (
            <div
              key={listing._id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out ${
                index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
              }`}
            >
              <img
                src={listing.imageUrls[0]}
                alt={listing.name}
                className="w-full h-full object-cover brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent flex flex-col justify-end p-8 sm:p-16 text-white z-20">
                <h3 className="text-xl sm:text-3xl font-extrabold mb-2 truncate max-w-2xl tracking-tight">
                  {listing.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-zinc-300 mb-6 truncate max-w-xl uppercase tracking-wider">
                  {listing.address}
                </p>
                <Link
                  to={`/listing/${listing._id}`}
                  className="bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition shadow-sm w-fit"
                >
                  View Property
                </Link>
              </div>
            </div>
          ))}

          {/* Slide navigation controls */}
          {offerListings.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/95 hover:bg-white text-zinc-900 p-3.5 rounded-full z-20 cursor-pointer transition-all focus:outline-none opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-sm"
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/95 hover:bg-white text-zinc-900 p-3.5 rounded-full z-20 cursor-pointer transition-all focus:outline-none opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-sm"
              >
                <FaChevronRight size={16} />
              </button>
            </>
          )}
        </div>
      )}

      {/* Listing Categories Grid */}
      <div className="max-w-6xl mx-auto p-3 sm:p-6 flex flex-col gap-16 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-zinc-100 pb-5">
              <div>
                <h2 className="text-lg font-bold text-zinc-800 uppercase tracking-widest">
                  Featured Offers
                </h2>
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-1">
                  Exclusive pricing on premium properties
                </p>
              </div>
              <Link
                className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-bold uppercase tracking-wider"
                to={"/search?offer=true"}
              >
                See All Offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-zinc-100 pb-5">
              <div>
                <h2 className="text-lg font-bold text-zinc-800 uppercase tracking-widest">
                  Properties For Rent
                </h2>
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-1">
                  Find your next temporary home or long-term lease
                </p>
              </div>
              <Link
                className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-bold uppercase tracking-wider"
                to={"/search?type=rent"}
              >
                See All Rentals
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-zinc-100 pb-5">
              <div>
                <h2 className="text-lg font-bold text-zinc-800 uppercase tracking-widest">
                  Properties For Sale
                </h2>
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-1">
                  Invest in your dream property today
                </p>
              </div>
              <Link
                className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-bold uppercase tracking-wider"
                to={"/search?type=sale"}
              >
                See All Sales
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
    <div className="pb-10 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto text-center md:text-left">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl tracking-tight">
          Find your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className="text-slate-500 text-xs sm:text-sm">
          Abdullah-Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline self-center md:self-start bg-blue-50 hover:bg-blue-100/80 border border-blue-200 px-5 py-3.5 rounded-lg shadow-sm transition"
        >
          Let's get started...
        </Link>
      </div>

      {/* Dynamic Slide Showcase */}
      {offerListings && offerListings.length > 0 && (
        <div className="relative w-full h-[300px] sm:h-[500px] overflow-hidden bg-slate-900 group shadow-md my-6 max-w-7xl mx-auto rounded-none md:rounded-2xl">
          {offerListings.map((listing, index) => (
            <div
              key={listing._id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={listing.imageUrls[0]}
                alt={listing.name}
                className="w-full h-full object-cover brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 sm:p-14 text-white z-20">
                <h3 className="text-xl sm:text-3xl font-bold mb-2 truncate">
                  {listing.name}
                </h3>
                <p className="text-sm sm:text-lg font-semibold text-slate-200 mb-4 truncate max-w-xl">
                  {listing.address}
                </p>
                <Link
                  to={`/listing/${listing._id}`}
                  className="bg-white text-slate-800 font-bold text-sm px-5 py-2.5 rounded-lg w-fit hover:bg-slate-100 transition shadow"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}

          {/* Slide navigation controls */}
          {offerListings.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full z-20 cursor-pointer transition focus:outline-none opacity-0 group-hover:opacity-100 duration-300"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full z-20 cursor-pointer transition focus:outline-none opacity-0 group-hover:opacity-100 duration-300"
              >
                <FaChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      )}

      {/* Listing Categories Grid */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-12 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="my-3 flex justify-between items-end border-b pb-4 border-slate-200">
              <div>
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent offers
                </h2>
                <p className="text-sm text-slate-500">
                  Properties with discounts and hot deals
                </p>
              </div>
              <Link
                className="text-sm text-blue-800 hover:underline font-bold"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="my-3 flex justify-between items-end border-b pb-4 border-slate-200">
              <div>
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for rent
                </h2>
                <p className="text-sm text-slate-500">
                  Find a cozy room or rental apartment
                </p>
              </div>
              <Link
                className="text-sm text-blue-800 hover:underline font-bold"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="my-3 flex justify-between items-end border-b pb-4 border-slate-200">
              <div>
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for sale
                </h2>
                <p className="text-sm text-slate-500">
                  Purchase your dream property today
                </p>
              </div>
              <Link
                className="text-sm text-blue-800 hover:underline font-bold"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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

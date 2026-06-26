import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const prevSlide = () => {
    if (listing && listing.imageUrls.length > 0) {
      setCurrentSlide((prev) =>
        prev === 0 ? listing.imageUrls.length - 1 : prev - 1
      );
    }
  };

  const nextSlide = () => {
    if (listing && listing.imageUrls.length > 0) {
      setCurrentSlide((prev) =>
        prev === listing.imageUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (loading) return <p className="text-center my-20 text-lg font-bold text-zinc-450 uppercase tracking-widest animate-pulse">Loading...</p>;
  if (error)
    return (
      <p className="text-center my-20 text-lg font-bold text-red-600 uppercase tracking-widest">
        Something went wrong!
      </p>
    );

  return (
    <main className="pb-20">
      {listing && (
        <div>
          {/* Custom Slider */}
          <div className="relative w-full h-[320px] sm:h-[600px] overflow-hidden bg-zinc-950 group">
            {listing.imageUrls.map((url, index) => (
              <div
                key={url}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out ${
                  index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                }`}
              >
                <img
                  src={url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Slider Controls */}
            {listing.imageUrls.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/90 hover:bg-white text-zinc-800 p-3.5 rounded-full z-20 cursor-pointer focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100"
                >
                  <FaChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/90 hover:bg-white text-zinc-800 p-3.5 rounded-full z-20 cursor-pointer focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100"
                >
                  <FaChevronRight size={16} />
                </button>

                {/* Slider Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {listing.imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white scale-120 shadow-md"
                          : "bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Share Button */}
          <div className="fixed top-[15%] right-[5%] z-30 border border-white/50 rounded-full w-11 h-11 flex justify-center items-center bg-white/60 backdrop-blur-sm cursor-pointer hover:bg-white hover:shadow-lg shadow transition duration-300">
            <FaShare
              className="text-zinc-600 hover:text-zinc-900 text-sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-30 rounded-xl bg-zinc-900 text-white text-[10px] uppercase font-bold tracking-wider p-2.5 shadow-md">
              Link copied!
            </p>
          )}

          {/* Listing Details */}
          <div className="flex flex-col max-w-4xl mx-auto p-6 sm:p-8 mt-10 gap-5 bg-white/40 backdrop-blur-md border border-white/50 shadow-md rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                  {listing.name}
                </h1>
                <p className="flex items-center gap-1.5 text-zinc-500 font-semibold text-xs uppercase tracking-wide mt-1">
                  <FaMapMarkerAlt className="text-zinc-400 shrink-0" />
                  {listing.address}
                </p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <p className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  $
                  {listing.offer
                    ? listing.discountPrice.toLocaleString("en-US")
                    : listing.regularPrice.toLocaleString("en-US")}
                  {listing.type === "rent" && <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">/ mo</span>}
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <p className="bg-zinc-900 text-white text-center px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-sm">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-emerald-700 text-white text-center px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-sm">
                  ${(listing.regularPrice - listing.discountPrice).toLocaleString("en-US")} OFF
                </p>
              )}
            </div>

            <div className="text-zinc-700 leading-relaxed text-sm sm:text-base border-t border-white/40 pt-5">
              <p className="font-bold text-zinc-900 text-sm uppercase tracking-wider mb-2">Description</p>
              <p className="text-zinc-500 font-medium text-sm sm:text-base">{listing.description}</p>
            </div>

            <ul className="text-zinc-500 font-bold text-[11px] flex flex-wrap items-center gap-4 sm:gap-8 border-t border-b py-5 border-white/40 my-2 uppercase tracking-widest">
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaBed className="text-zinc-400 text-sm" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : `${listing.bedrooms} Bed`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaBath className="text-zinc-400 text-sm" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : `${listing.bathrooms} Bath`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaParking className="text-zinc-400 text-sm" />
                {listing.parking ? "Parking Spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaChair className="text-zinc-400 text-sm" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-zinc-900 hover:bg-zinc-950 text-white rounded-xl uppercase hover:opacity-95 p-3.5 transition duration-300 font-bold text-xs tracking-wider shadow-sm mt-2 cursor-pointer"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}

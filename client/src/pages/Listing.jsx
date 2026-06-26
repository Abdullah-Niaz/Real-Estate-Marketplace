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

  if (loading) return <p className="text-center my-7 text-2xl">Loading...</p>;
  if (error)
    return (
      <p className="text-center my-7 text-2xl text-red-700">
        Something went wrong!
      </p>
    );

  return (
    <main>
      {listing && (
        <div>
          {/* Custom Slider */}
          <div className="relative w-full h-[300px] sm:h-[550px] overflow-hidden bg-slate-900 group">
            {listing.imageUrls.map((url, index) => (
              <div
                key={url}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
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
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full z-20 cursor-pointer focus:outline-none transition duration-300"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full z-20 cursor-pointer focus:outline-none transition duration-300"
                >
                  <FaChevronRight size={20} />
                </button>

                {/* Slider Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {listing.imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white scale-110"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Share Button */}
          <div className="fixed top-[13%] right-[3%] z-30 border rounded-full w-12 h-12 flex justify-center items-center bg-white cursor-pointer hover:bg-slate-100 shadow-md">
            <FaShare
              className="text-slate-500 hover:text-slate-700"
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
            <p className="fixed top-[21%] right-[5%] z-30 rounded-md bg-slate-100 p-2 text-xs font-semibold shadow-md">
              Link copied!
            </p>
          )}

          {/* Listing Details */}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / Month"}
            </h1>
            <p className="flex items-center mt-2 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1.5 rounded-md font-semibold text-sm shadow">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1.5 rounded-md font-semibold text-sm shadow">
                  ${(listing.regularPrice - listing.discountPrice).toLocaleString("en-US")} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 border-t border-b py-4 my-2 border-slate-200">
              <li className="flex items-center gap-1.5 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1.5 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1.5 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1.5 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 transition duration-300 font-semibold mt-2"
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

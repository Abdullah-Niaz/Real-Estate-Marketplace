import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="group bg-white/40 backdrop-blur-md border border-white/60 hover:border-zinc-300/40 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:bg-white/80 transition-all duration-500 ease-out w-full sm:w-[330px] flex flex-col justify-between">
      <Link to={`/listing/${listing._id}`} className="flex flex-col h-full">
        {/* Cover Image */}
        <div className="relative overflow-hidden h-[210px] w-full bg-zinc-100">
          <img
            src={
              listing.imageUrls[0] ||
              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=60"
            }
            alt="listing cover"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-3 left-3 bg-zinc-900/90 text-white text-[10px] uppercase px-2.5 py-1 rounded-full font-bold shadow-sm tracking-wider">
            {listing.type === "rent" ? "Rent" : "Sale"}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-2 flex-1 justify-between">
          <div className="flex flex-col gap-2">
            <p className="truncate text-base font-bold text-zinc-800 group-hover:text-zinc-950 transition-colors tracking-tight">
              {listing.name}
            </p>
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-zinc-400 h-3.5 w-3.5 shrink-0" />
              <p className="text-xs text-zinc-500 truncate w-full font-medium">
                {listing.address}
              </p>
            </div>
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {listing.description}
            </p>
          </div>
          
          <div className="mt-5 border-t border-zinc-200/40 pt-4">
            <p className="text-zinc-900 font-extrabold text-base flex items-baseline gap-0.5">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && (
                <span className="text-[10px] text-zinc-400 font-normal ml-0.5">/ mo</span>
              )}
            </p>
            
            <div className="text-zinc-400 flex gap-4 mt-2 text-[10px] font-bold uppercase tracking-wider">
              <div>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : `${listing.bedrooms} Bed`}
              </div>
              <div>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : `${listing.bathrooms} Bath`}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

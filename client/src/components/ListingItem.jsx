import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] border border-slate-100 flex flex-col justify-between">
      <Link to={`/listing/${listing._id}`} className="flex flex-col h-full">
        {/* Cover Image */}
        <div className="relative overflow-hidden h-[200px]">
          <img
            src={
              listing.imageUrls[0] ||
              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=60"
            }
            alt="listing cover"
            className="h-full w-full object-cover hover:scale-105 transition-scale duration-300"
          />
          <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-xs uppercase px-2 py-1 rounded font-semibold shadow">
            {listing.type === "rent" ? "Rent" : "Sale"}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <p className="truncate text-lg font-semibold text-slate-700 hover:text-slate-900 transition-colors">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-green-700 h-4 w-4 shrink-0" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold flex items-center">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / Month"}
          </p>
          <div className="text-slate-700 flex gap-4 mt-2 border-t pt-3 border-slate-100">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds `
                : `${listing.bedrooms} Bed `}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths `
                : `${listing.bathrooms} Bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

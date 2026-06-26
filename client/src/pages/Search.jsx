import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebardata, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl !== null ||
      typeFromUrl !== null ||
      parkingFromUrl !== null ||
      furnishedFromUrl !== null ||
      offerFromUrl !== null ||
      sortFromUrl !== null ||
      orderFromUrl !== null
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebardata,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", numberOfListings);
    const searchQuery = urlParams.toString();
    try {
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length < 9) {
        setShowMore(false);
      }
      setListings([...listings, ...data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar Filter Form */}
      <div className="p-8 md:p-10 border-b md:border-r md:border-b-0 border-white/50 w-full md:w-[360px] shrink-0 bg-white/40 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 sticky top-24">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-zinc-700 text-xs uppercase tracking-wider">
              Search Term
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search property name..."
              className="border border-white/50 rounded-xl p-3.5 w-full bg-white/30 backdrop-blur-sm text-sm focus:border-zinc-300 focus:bg-white/80 outline-none transition"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <label className="font-bold text-zinc-700 text-xs uppercase tracking-wider">Type</label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2.5 items-center">
                <input
                  type="checkbox"
                  id="all"
                  className="w-4 h-4 accent-zinc-950 cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span className="text-zinc-600 text-sm font-medium">Rent & Sale</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-4 h-4 accent-zinc-950 cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span className="text-zinc-600 text-sm font-medium">Rent</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-4 h-4 accent-zinc-950 cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <span className="text-zinc-600 text-sm font-medium">Sale</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-4 h-4 accent-zinc-950 cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span className="text-zinc-600 text-sm font-medium">Special Offer</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-bold text-zinc-700 text-xs uppercase tracking-wider">Amenities</label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2.5 items-center">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-4 h-4 accent-zinc-950 cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span className="text-zinc-600 text-sm font-medium">Parking Spot</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-4 h-4 accent-zinc-950 cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span className="text-zinc-600 text-sm font-medium">Furnished</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-zinc-700 text-xs uppercase tracking-wider">Sort</label>
            <select
              id="sort_order"
              className="border border-white/50 rounded-xl p-3 bg-white/30 backdrop-blur-sm text-sm focus:border-zinc-300 focus:bg-white/80 outline-none cursor-pointer text-zinc-700 font-semibold"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="createdAt_desc">Date: Newest First</option>
              <option value="createdAt_asc">Date: Oldest First</option>
            </select>
          </div>
          
          <button className="bg-zinc-900 hover:bg-zinc-950 text-white p-3.5 rounded-xl uppercase font-bold text-xs tracking-wider transition w-full shadow-sm mt-2 cursor-pointer">
            Apply Filters
          </button>
        </form>
      </div>

      {/* Grid Results Section */}
      <div className="flex-1 p-8 md:p-10">
        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight border-b border-zinc-100 pb-5">
          Properties Found
        </h1>
        <div className="py-8 flex flex-wrap gap-6 justify-center md:justify-start">
          {!loading && listings.length === 0 && (
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest text-center w-full mt-20">
              No listings found!
            </p>
          )}
          {loading && (
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest text-center w-full mt-20">
              Searching listings...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-zinc-500 hover:text-zinc-950 hover:underline py-10 text-center w-full font-bold text-xs uppercase tracking-widest cursor-pointer"
            >
              Show More Listings
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

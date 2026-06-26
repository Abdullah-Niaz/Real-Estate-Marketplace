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
      <div className="p-7 border-b-2 md:border-r-2 md:border-b-0 border-slate-200 w-full md:w-[380px] shrink-0 bg-slate-50">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 sticky top-6">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold text-slate-800">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full bg-white shadow-sm focus:ring-2 focus:ring-slate-500 outline-none"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold text-slate-800 mr-2">Type:</label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="all"
                className="w-5 h-5 accent-slate-700"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span className="text-slate-700 text-sm font-medium">Rent & Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rent"
                className="w-5 h-5 accent-slate-700"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span className="text-slate-700 text-sm font-medium">Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sale"
                className="w-5 h-5 accent-slate-700"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span className="text-slate-700 text-sm font-medium">Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5 accent-slate-700"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span className="text-slate-700 text-sm font-medium">Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold text-slate-800 mr-2">Amenities:</label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                className="w-5 h-5 accent-slate-700"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span className="text-slate-700 text-sm font-medium">Parking</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5 accent-slate-700"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span className="text-slate-700 text-sm font-medium">Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold text-slate-800">Sort:</label>
            <select
              id="sort_order"
              className="border rounded-lg p-3 bg-white shadow-sm focus:ring-2 focus:ring-slate-500 outline-none cursor-pointer text-slate-700"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 transition font-semibold">
            Search
          </button>
        </form>
      </div>

      {/* Grid Results Section */}
      <div className="flex-1 p-7">
        <h1 className="text-3xl font-semibold border-b pb-4 text-slate-800">
          Listing Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4 justify-center md:justify-start">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700 text-center w-full mt-10">
              No listings found!
            </p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full mt-10">
              Loading...
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
              className="text-green-700 hover:underline p-7 text-center w-full font-semibold"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl !== null) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-white/60 backdrop-blur-md sticky top-0 z-50 border-b border-white/50 shadow-sm">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4 px-6">
        <Link to="/">
          <h1 className="font-bold text-base sm:text-lg tracking-tight flex items-center mb-0.5">
            <span className="text-zinc-900 font-extrabold">ABDULLAH</span>
            <span className="text-zinc-400 font-light ml-1">ESTATE</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white/40 backdrop-blur-sm border border-white/50 px-4 py-2 rounded-full flex items-center focus-within:border-zinc-300 focus-within:bg-white/80 transition-all duration-300 w-32 sm:w-72 shadow-sm"
        >
          <input
            type="text"
            placeholder="Search properties..."
            className="bg-transparent focus:outline-none w-full text-sm text-zinc-800 placeholder-zinc-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="focus:outline-none ml-1 cursor-pointer">
            <FaSearch className="text-zinc-400 hover:text-zinc-600 transition-colors text-xs sm:text-sm" />
          </button>
        </form>
        <ul className="flex items-center gap-4 sm:gap-6">
          <Link to="/">
            <li className="hidden sm:inline text-zinc-600 hover:text-zinc-900 font-medium text-sm transition-colors cursor-pointer">
              Home
            </li>
          </Link>

          <Link to="/search?type=rent">
            <li className="hidden md:inline text-zinc-600 hover:text-zinc-900 font-medium text-sm transition-colors cursor-pointer">
              Rentals
            </li>
          </Link>

          <Link to="/search?type=sale">
            <li className="hidden md:inline text-zinc-600 hover:text-zinc-900 font-medium text-sm transition-colors cursor-pointer">
              Sales
            </li>
          </Link>

          <Link to="/search?offer=true">
            <li className="hidden sm:inline text-zinc-600 hover:text-zinc-900 font-medium text-sm transition-colors cursor-pointer">
              Offers
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-zinc-600 hover:text-zinc-900 font-medium text-sm transition-colors cursor-pointer">
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to="/profile" className="flex items-center">
              <img
                src={currentUser.avatar}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover border border-white/80 hover:border-zinc-300/40 transition-colors cursor-pointer"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="text-zinc-600 hover:text-zinc-900 font-medium text-sm transition-colors cursor-pointer">
                Sign in
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

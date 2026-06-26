import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(currentUser?.avatar || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    avatar: currentUser?.avatar || "",
  });

  useEffect(() => {
    if (currentUser) {
      setImageUrl(currentUser.avatar || "");

      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (file) {
      uploadImage();
    }
  }, [file]);

  const uploadImage = async () => {
    setUploading(true);
    setUploadError(false);
    setUpdateSuccess(false);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: cloudinaryFormData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Image upload failed");
      }

      setImageUrl(data.secure_url);

      setFormData((prev) => ({
        ...prev,
        avatar: data.secure_url,
      }));

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploadError(true);
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setUpdateSuccess(false);

    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?._id) {
      dispatch(updateUserFailure("User ID not found. Please sign in again."));
      return;
    }

    try {
      dispatch(updateUserStart());
      setUpdateSuccess(false);

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateUserFailure(data.message || "Profile update failed"));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch("/api/user/signout", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  if (!currentUser) {
    return <p className="text-center mt-7">Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white/40 backdrop-blur-md border border-white/50 shadow-md rounded-3xl mt-10 mb-20 p-8 sm:p-10">
      <h1 className="text-3xl font-extrabold text-center text-zinc-900 tracking-tight mb-8">
        Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="relative group self-center cursor-pointer mb-2">
          <img
            onClick={() => fileRef.current.click()}
            src={imageUrl || currentUser.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover border border-white/80 hover:border-zinc-300/40 transition-colors shadow-sm"
          />
          <div className="absolute inset-0 bg-black/40 text-white text-[10px] uppercase font-bold flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Edit
          </div>
        </div>

        {uploading && (
          <p className="text-xs text-center text-zinc-500 font-semibold">
            Uploading image...
          </p>
        )}

        {uploadError && (
          <p className="text-xs text-center text-red-600 font-semibold">
            Image upload failed (2MB max)
          </p>
        )}

        {imageUrl && imageUrl !== currentUser.avatar && (
          <p className="text-xs text-center text-green-600 font-semibold">
            Image uploaded. Click Update to save.
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="border border-white/50 rounded-xl p-3.5 bg-white/30 backdrop-blur-sm text-sm focus:border-zinc-300 focus:bg-white/85 outline-none transition duration-200"
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-white/50 rounded-xl p-3.5 bg-white/30 backdrop-blur-sm text-sm focus:border-zinc-300 focus:bg-white/85 outline-none transition duration-200"
        />

        <input
          type="password"
          placeholder="Password (Leave blank to keep same)"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-white/50 rounded-xl p-3.5 bg-white/30 backdrop-blur-sm text-sm focus:border-zinc-300 focus:bg-white/85 outline-none transition duration-200"
        />

        <button
          disabled={loading || uploading}
          className="bg-zinc-900 text-white rounded-xl p-3.5 uppercase hover:bg-zinc-950 transition duration-300 disabled:opacity-80 font-bold text-xs tracking-wider shadow-sm"
        >
          {loading ? "Updating..." : "Update Details"}
        </button>
        <Link
          to="/create-listing"
          className="bg-emerald-700 text-white p-3.5 rounded-xl uppercase text-center hover:bg-emerald-800 transition duration-300 font-bold text-xs tracking-wider shadow-sm"
        >
          Create New Listing
        </Link>
      </form>

      {error && <p className="text-red-600 text-xs text-center mt-4 font-semibold">{error}</p>}

      {updateSuccess && (
        <p className="text-green-600 text-xs text-center mt-4 font-semibold">
          Profile updated successfully!
        </p>
      )}

      <div className="flex justify-between mt-8 border-t border-white/40 pt-6">
        <span
          onClick={handleDeleteUser}
          className="text-zinc-400 hover:text-red-600 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-zinc-400 hover:text-zinc-900 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200"
        >
          Sign Out
        </span>
      </div>

      <button
        onClick={handleShowListings}
        className="text-zinc-500 hover:text-zinc-900 w-full mt-8 text-xs font-bold uppercase tracking-widest hover:underline transition-colors cursor-pointer"
      >
        Show My Listings
      </button>
      <p className="text-red-600 mt-4 text-center text-xs font-semibold">
        {showListingsError ? "Error loading listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4 mt-8 border-t border-white/40 pt-8">
          <h2 className="text-center text-lg font-extrabold text-zinc-800 tracking-tight mb-2">
            Your Listings
          </h2>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border border-white/50 rounded-2xl p-4 flex justify-between items-center gap-4 bg-white/20 backdrop-blur-sm shadow-sm hover:bg-white/40 transition-all duration-300"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-14 w-18 object-cover rounded-xl border border-white/40"
                />
              </Link>
              <Link
                className="text-zinc-700 font-bold hover:text-zinc-950 hover:underline truncate flex-1 text-sm tracking-tight"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <Link
                  to={`/update-listing/${listing._id}`}
                  className="text-emerald-600 uppercase font-bold text-[10px] tracking-wide hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-500 uppercase font-bold text-[10px] tracking-wide hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

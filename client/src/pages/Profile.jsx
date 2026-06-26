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
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <img
          onClick={() => fileRef.current.click()}
          src={imageUrl || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        {uploading && (
          <p className="text-sm text-center text-slate-700">
            Uploading image...
          </p>
        )}

        {uploadError && (
          <p className="text-sm text-center text-red-700">
            Image upload failed
          </p>
        )}

        {imageUrl && imageUrl !== currentUser.avatar && (
          <p className="text-sm text-center text-green-700">
            Image uploaded. Click Update to save.
          </p>
        )}

        <input
          type="text"
          placeholder="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <button
          disabled={loading || uploading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <Link
          to="/create-listing"
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>

      {error && <p className="text-red-700 mt-5">{error}</p>}

      {updateSuccess && (
        <p className="text-green-700 mt-5">Profile updated successfully!</p>
      )}

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>

      <button
        onClick={handleShowListings}
        className="text-green-700 w-full mt-5 hover:underline font-semibold"
      >
        Show Listings
      </button>
      <p className="text-red-700 mt-5 text-center text-sm">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4 mt-6 border-t border-slate-200 pt-6">
          <h2 className="text-center text-2xl font-semibold">Your Listings</h2>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border border-slate-300 rounded-lg p-3 flex justify-between items-center gap-4 bg-slate-50 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-20 object-cover rounded-md"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-700 uppercase font-semibold text-xs hover:underline cursor-pointer"
                >
                  Delete
                </button>
                <Link
                  to={`/update-listing/${listing._id}`}
                  className="text-green-700 uppercase font-semibold text-xs hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

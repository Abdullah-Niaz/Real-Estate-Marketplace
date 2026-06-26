import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      try {
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setFormData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false);
        });
    } else if (files.length === 0) {
      setImageUploadError("Please select images to upload first");
    } else {
      setImageUploadError("You can only upload 6 images per listing");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", uploadPreset);

      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Upload failed");
          }
          return res.json();
        })
        .then((data) => resolve(data.secure_url))
        .catch((err) => reject(err));
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image");
      }
      if (formData.offer && Number(formData.regularPrice) <= Number(formData.discountPrice)) {
        return setError("Discount price must be lower than regular price");
      }
      setLoading(true);
      setError(false);

      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto bg-white/40 backdrop-blur-md border border-white/50 shadow-md rounded-3xl mt-10 mb-20 p-8 sm:p-10">
      <h1 className="text-3xl font-extrabold text-center text-zinc-900 tracking-tight mb-8">
        Update a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-8">
        {/* Left column */}
        <div className="flex flex-col gap-5 flex-1">
          <input
            type="text"
            placeholder="Property Name"
            className="border border-white/50 p-3.5 rounded-xl bg-white/30 backdrop-blur-sm text-sm focus:border-zinc-300 focus:bg-white/80 outline-none transition duration-200"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Property Description"
            className="border border-white/50 p-3.5 rounded-xl bg-white/30 backdrop-blur-sm text-sm focus:border-zinc-300 focus:bg-white/80 outline-none transition duration-200 min-h-[120px]"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-white/50 p-3.5 rounded-xl bg-white/30 backdrop-blur-sm text-sm focus:border-zinc-300 focus:bg-white/80 outline-none transition duration-200"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          
          <div className="flex gap-5 flex-wrap my-2">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sale"
                className="w-4 h-4 accent-zinc-950 cursor-pointer"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span className="text-sm font-semibold text-zinc-700">Sell</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rent"
                className="w-4 h-4 accent-zinc-950 cursor-pointer"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span className="text-sm font-semibold text-zinc-700">Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                className="w-4 h-4 accent-zinc-950 cursor-pointer"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span className="text-sm font-semibold text-zinc-700">Parking Spot</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="furnished"
                className="w-4 h-4 accent-zinc-950 cursor-pointer"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span className="text-sm font-semibold text-zinc-700">Furnished</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                className="w-4 h-4 accent-zinc-950 cursor-pointer"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span className="text-sm font-semibold text-zinc-700">Special Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mt-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-white/50 rounded-xl w-20 text-sm focus:border-zinc-300 focus:bg-white/80 bg-white/30 backdrop-blur-sm outline-none transition"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-white/50 rounded-xl w-20 text-sm focus:border-zinc-300 focus:bg-white/80 bg-white/30 backdrop-blur-sm outline-none transition"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-white/50 rounded-xl w-28 text-sm focus:border-zinc-300 focus:bg-white/80 bg-white/30 backdrop-blur-sm outline-none transition"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Reg. Price</span>
                {formData.type === "rent" && (
                  <span className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">($ / Month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-white/50 rounded-xl w-28 text-sm focus:border-zinc-300 focus:bg-white/80 bg-white/30 backdrop-blur-sm outline-none transition"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Disc. Price</span>
                  {formData.type === "rent" && (
                    <span className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">($ / Month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col flex-1 gap-5">
          <div>
            <p className="font-bold text-zinc-800 text-sm">
              Property Images:
            </p>
            <span className="text-xs text-zinc-400 font-medium">
              First image is the cover (max 6 images total).
            </span>
          </div>

          <div className="flex gap-3">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-white/50 bg-white/20 backdrop-blur-sm rounded-xl w-full text-xs text-zinc-500 focus:outline-none cursor-pointer"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 px-5 text-emerald-700 border border-emerald-600/80 rounded-xl uppercase text-xs font-bold tracking-wider hover:bg-emerald-700 hover:text-white transition duration-300 disabled:opacity-80 cursor-pointer shrink-0"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          
          {imageUploadError && (
            <p className="text-red-600 text-xs font-semibold">{imageUploadError}</p>
          )}

          {formData.imageUrls.length > 0 && (
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
              {formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border border-white/40 items-center bg-white/20 backdrop-blur-sm rounded-2xl shadow-sm hover:bg-white/40 transition-all duration-300"
                >
                  <img
                    src={url}
                    alt="listing preview"
                    className="w-16 h-16 object-cover rounded-xl border border-white/40 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-500 uppercase font-bold text-[10px] tracking-wide hover:underline cursor-pointer p-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            disabled={loading || uploading}
            className="p-3.5 bg-zinc-900 text-white rounded-xl uppercase hover:bg-zinc-950 transition duration-300 disabled:opacity-80 font-bold text-xs tracking-wider shadow-sm mt-2 cursor-pointer"
          >
            {loading ? "Updating listing..." : "Update listing"}
          </button>
          
          {error && (
            <p className="text-red-600 text-xs font-semibold text-center mt-2">{error}</p>
          )}
        </div>
      </form>
    </main>
  );
}

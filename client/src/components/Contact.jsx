import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          return;
        }
        setLandlord(data);
        setError(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-3 mt-4 border border-slate-200 p-4 rounded-lg bg-slate-50 shadow-sm">
          <p className="font-semibold text-slate-800">
            Contact <span className="text-slate-900 font-bold">{landlord.username}</span>{" "}
            for{" "}
            <span className="text-slate-900 font-bold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg bg-white shadow-inner focus:ring-2 focus:ring-slate-500 outline-none"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${encodeURIComponent(message)}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 transition font-semibold"
          >
            Send Message
          </Link>
        </div>
      )}
      {error && (
        <p className="text-red-700 text-sm mt-2">
          Could not load landlord information.
        </p>
      )}
    </>
  );
}

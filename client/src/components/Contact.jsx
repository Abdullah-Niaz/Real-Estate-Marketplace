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
        <div className="flex flex-col gap-4 mt-6 border border-zinc-100 p-5 rounded-2xl bg-zinc-50/50 shadow-sm">
          <p className="text-sm text-zinc-600 font-medium leading-relaxed">
            Contact <span className="text-zinc-900 font-bold">{landlord.username}</span>{" "}
            regarding{" "}
            <span className="text-zinc-900 font-bold">"{listing.name}"</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={onChange}
            placeholder="Write your message to the landlord..."
            className="w-full border border-zinc-200 rounded-xl p-3.5 bg-white text-sm focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 outline-none transition duration-200 shadow-sm placeholder-zinc-400"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${encodeURIComponent(message)}`}
            className="bg-zinc-900 hover:bg-zinc-950 text-white text-center p-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition duration-300 shadow-sm"
          >
            Send Message
          </Link>
        </div>
      )}
      {error && (
        <p className="text-red-600 text-xs mt-2 font-medium">
          Could not load landlord information.
        </p>
      )}
    </>
  );
}

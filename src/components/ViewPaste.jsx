import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Copy to clipboard
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert("✅ Copied to clipboard!");
  };

  // Share paste
  const handleShare = (paste) => {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
      });
    } else {
      alert("Sharing not supported on this browser");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      {/* Search Bar */}
      <input
        className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 mb-6 text-sm sm:text-base"
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Show filtered results */}
      {filterData.length > 0 ? (
        filterData.map((paste) => (
          <div
            key={paste._id}
            className="border border-gray-300 rounded-lg p-4 sm:p-6 mb-4 bg-gray-100 shadow-sm"
          >
            {/* Title */}
            <h2 className="font-semibold text-base sm:text-lg text-gray-800 mb-2 break-words">
              {paste.title}
            </h2>

            {/* Content */}
            <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line break-words">
              {paste.content}
            </p>

            {/* Created At */}
            <p className="text-xs text-gray-500 mt-2">
              Created: {new Date(paste.createat).toLocaleString()}
            </p>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mt-4 text-sm sm:text-base">
              <button
                onClick={() => navigate(`/?pasteid=${paste._id}`)}
                className="px-3 py-2 rounded-lg border border-gray-400 hover:bg-gray-200 transition w-full sm:w-auto"
              >
                Edit
              </button>

              <button
                onClick={() => alert(`Viewing: ${paste.content}`)}
                className="px-3 py-2 rounded-lg border border-gray-400 hover:bg-gray-200 transition w-full sm:w-auto"
              >
                View
              </button>

              <button
                onClick={() => handleCopy(paste.content)}
                className="px-3 py-2 rounded-lg border border-gray-400 hover:bg-gray-200 transition w-full sm:w-auto"
              >
                Copy
              </button>

              <button
                onClick={() => dispatch(removeFromPastes(paste._id))}
                className="px-3 py-2 rounded-lg border border-gray-400 text-red-600 hover:bg-gray-200 transition w-full sm:w-auto"
              >
                Delete
              </button>

              <button
                onClick={() => handleShare(paste)}
                className="px-3 py-2 rounded-lg border border-gray-400 hover:bg-gray-200 transition w-full sm:w-auto"
              >
                Share
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No pastes found. Try creating one!
        </p>
      )}
    </div>
  );
};

export default Paste;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams(); // ✅ matches ":id"
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-gray-500">
        ❌ Paste not found
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    alert("✅ Copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
      });
    } else {
      alert("Sharing not supported in this browser");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="border border-gray-300 rounded-lg p-6 bg-gray-100 shadow-sm">
        <h1 className="font-semibold text-2xl text-gray-800 mb-4">
          {paste.title}
        </h1>

        <pre className="text-gray-700 whitespace-pre-wrap mb-4">
          {paste.content}
        </pre>

        <p className="text-xs text-gray-500 mb-6">
          Created: {new Date(paste.createat).toLocaleString()}
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate("/pastes")}
            className="px-3 py-1 rounded-lg border border-gray-400 hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1 rounded-lg border border-gray-400 hover:bg-gray-200 transition"
          >
            Copy
          </button>
          <button
            onClick={handleShare}
            className="px-3 py-1 rounded-lg border border-gray-400 hover:bg-gray-200 transition"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;

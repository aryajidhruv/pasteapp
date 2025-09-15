import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToPastes } from "../redux/pasteSlice";
import { toast } from "react-hot-toast";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  const existingPaste = pastes.find((p) => p._id === id);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  // Prefill values when editing
  useEffect(() => {
    if (existingPaste) {
      setTitle(existingPaste.title);
      setValue(existingPaste.content);
    }
  }, [existingPaste]);

  const handleUpdate = () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }

    const updatedPaste = {
      ...existingPaste,
      title,
      content: value,
      createat: new Date().toISOString(),
    };

    dispatch(updateToPastes(updatedPaste));
    toast.success("✅ Paste updated successfully");
    navigate("/pastes");
  };

  if (!existingPaste) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-gray-500">
        ❌ Paste not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
      <h1 className=" text-gray">Edit Paste</h1>

      {/* Title Input */}
      <input
        id="title"
        name="title"
        className="p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
        type="text"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Content Textarea */}
      <textarea
        value={value}
        placeholder="Enter content here"
        onChange={(e) => setValue(e.target.value)}
        rows={12}
        className="w-full min-h-[300px] sm:min-h-[400px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm sm:text-base"
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition font-medium"
        >
          Update Paste
        </button>
        <button
          onClick={() => navigate("/pastes")}
          className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Edit;

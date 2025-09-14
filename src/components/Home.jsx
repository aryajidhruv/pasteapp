import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { toast } from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteid");
  const dispatch = useDispatch();

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createat: new Date().toISOString(),
    };

    if (pasteId) {
      // UPDATE
      dispatch(updateToPastes(paste));
      toast.success("Paste updated successfully");
    } else {
      // CREATE
      dispatch(addToPastes(paste));
      toast.success("Paste created successfully");
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Title Input + Button Row */}
      <div className="flex flex-row gap-4 items-center">
        <input
          id="title"
          name="title"
          className="p-2 rounded-lg border border-gray-300 w-64 focus:outline-none focus:ring-1 focus:ring-gray-400"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          type="button"
          className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      {/* Content Textarea */}
      <textarea
        value={value}
        placeholder="Enter content here"
        onChange={(e) => setValue(e.target.value)}
        rows={12}
        className="w-full h-[400px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
    </div>
  );
};

export default Home;

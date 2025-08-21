import { Play } from "lucide-react";
import React from "react";

export default function Comment(props: {
  name?: string;
  date?: Date;
  content?: string;
  type: "POST" | "GET";
}) {
  const {
    // name,
    // date,
    // content,
    type,
  } = props;
  return (
    <div className="w-64 h-56 bg-[#FDFF78] rounded-xl p-4">
      {type === "POST" && (
        <>
          <input
            className="text-black text-2xl font-playfair font-semibold w-full outline-none"
            type="text"
            name="name"
            id="name"
            placeholder="Nama..."
          />
          <textarea
            style={{
              resize: "none",
            }}
            className="text-gray-800 text-lg w-full h-28 outline-none"
            name="content"
            id="content"
            placeholder="Ketik sesuatu..."
          />
          <button className="text-[#002492] bg-[#FEF6E9] px-4 py-2 cursor-pointer w-36 rounded-full flex items-center justify-between">
            Kirim.. <Play className="stroke-0 size-5" fill="#002492" />
          </button>
        </>
      )}
    </div>
  );
}

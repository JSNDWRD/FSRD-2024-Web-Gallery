"use client";
import { useEventsStore } from "@/utils/useEventsStore";
import { Play } from "lucide-react";
import { useState } from "react";

export default function Comment(props: {
  name?: string;
  date?: Date;
  content?: string;
  eventId: string;
  eventName: string;
  type: "POST" | "GET";
}) {
  const { name, date, content, type, eventId, eventName } = props;
  const formattedDate = date
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(date))
    : new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date());

  const [comment, setComment] = useState({
    name: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { postComment } = useEventsStore();

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
            value={comment.name}
            onChange={(e) => {
              setComment((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <textarea
            style={{
              resize: "none",
            }}
            className="text-gray-800 text-lg w-full h-28 outline-none"
            name="content"
            id="content"
            placeholder="Ketik sesuatu..."
            required
            value={comment.content}
            onChange={(e) => {
              setComment((prev) => ({
                ...prev,
                content: e.target.value,
              }));
            }}
          />
          <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              if (isSubmitting) return;
              setIsSubmitting(true);
              await postComment(
                comment.name,
                comment.content,
                eventId,
                eventName
              );
              setComment({ name: "", content: "" });
              setIsSubmitting(false);
            }}
            disabled={comment.content.length < 5 || isSubmitting}
            className={`${
              comment.content.length < 5 || isSubmitting
                ? "text-gray-400"
                : "text-[#002492]"
            }  bg-[#FEF6E9] px-4 py-2 cursor-pointer w-36 rounded-full flex items-center justify-between`}
          >
            {isSubmitting ? "Mengirim.." : "Kirim.."}{" "}
            <Play
              className="stroke-0 size-5"
              fill={`${
                comment.content.length < 5 || isSubmitting
                  ? "#99a1af"
                  : "#002492"
              }`}
            />
          </button>
        </>
      )}
      {type === "GET" && (
        <>
          <h1 className="text-black flex items-center justify-between text-xl font-playfair font-semibold w-full outline-none">
            <span className="truncate max-w-1/2">{name || "Anonymous"}</span>
            <span className="text-lg text-[#636161] font-medium">
              {formattedDate}
            </span>
          </h1>
          <p className="text-[#636161] text-lg w-full h-28 outline-none">
            {content}
          </p>
          {/* <button className="text-[#002492] bg-[#FEF6E9] px-4 py-2 cursor-pointer w-36 rounded-full flex items-center justify-between">
            Like <Play className="stroke-0 size-5" fill="#002492" />
          </button> */}
        </>
      )}
    </div>
  );
}

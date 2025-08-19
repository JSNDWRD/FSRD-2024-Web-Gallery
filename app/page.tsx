"use client";

import { useEffect } from "react";
import { useEventsStore } from "@/utils/useEventsStore";
import Navbar from "./components/Navbar";

export default function Home() {
  const {
    // images, events,
    fetchEvents,
    fetchImages,
    fetchComments,
  } = useEventsStore();

  useEffect(() => {
    fetchEvents();
    fetchImages();
    fetchComments();
  }, [fetchEvents, fetchImages, fetchComments]);

  return (
    <div className="flex flex-col min-h-[200vh]">
      <Navbar />
      {/* {images.map((e) => {
        return (
          <Link href={e.link} key={e.key} target="_blank">
            {decodeURIComponent(e.link)}
          </Link>
        );
      })}
      {events.map((e) => {
        return (
          <h1 key={e.id}>
            {e.title} - {e.coverUrl}
          </h1>
        );
      })}
      <div className="grid grid-cols-4 gap-4">
        {images.map((e) => {
          return (
            <Image
              src={`${e.link}`}
              key={e.key}
              alt={`${e.eventName}`}
              className="w-auto h-96 object-cover"
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRrYDAABXRUJQVlA4WAoAAAAgAAAAXgIATgEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggyAEAANAuAJ0BKl8CTwE+7Xa5VqmnJaOgCAEwHYlpbuF3YRq7QACewxEXMZafAEA+hfS9YcITAHvtm7k5KTD4LUIMwM2yiT29kLtKgWS7Xi5OQ99snIe+2TkPfbKKJyI73vxYQXmvte0Ptm7k5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHrAAAP7+VS909dN0zDZzJmGzmTMNnMmYbOZMw2cyZhq7hNraKWtopa2ilraKWtopazUFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
              unoptimized={true}
              width={400}
              height={400}
            />
          );
        })}
      </div> */}
    </div>
  );
}

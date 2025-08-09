"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GetImageResponseDto } from "./api/dto";
import Image from "next/image";

export default function Home() {
  const [images, setImages] = useState<GetImageResponseDto>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/r2-storage");
      const data = await res.json();
      console.log(data);
      setImages(data);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col *:underline *:text-blue-500">
      {images.map((e) => {
        return (
          <Link href={e.link} key={e.key} target="_blank">
            {decodeURIComponent(e.link)}
          </Link>
        );
      })}
      <div className="grid grid-cols-4 gap-4">
        {images.map((e) => {
          return (
            <Image
              src={`${e.link}`}
              key={e.key}
              alt={`${e.eventName}`}
              // Nanti diganti ke fungsi placeholder blur
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRrYDAABXRUJQVlA4WAoAAAAgAAAAXgIATgEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggyAEAANAuAJ0BKl8CTwE+7Xa5VqmnJaOgCAEwHYlpbuF3YRq7QACewxEXMZafAEA+hfS9YcITAHvtm7k5KTD4LUIMwM2yiT29kLtKgWS7Xi5OQ99snIe+2TkPfbKKJyI73vxYQXmvte0Ptm7k5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHrAAAP7+VS909dN0zDZzJmGzmTMNnMmYbOZMw2cyZhq7hNraKWtopa2ilraKWtopazUFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
              unoptimized={true}
              width={200}
              height={400}
            />
          );
        })}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [images, setImages] = useState<GetImageResponseDto[]>([]);
  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/r2-storage");
    const data = await res.json();
    console.log(data);
    setImages(data.files);
  };
  fetchData();
  return (
    <div className="flex flex-col *:underline *:text-blue-500">
      {images.map((e) => {
        return (
          <Link href={e.link} key={e.key} target="_blank">
            {e.link}
          </Link>
        );
      })}
    </div>
  );
}

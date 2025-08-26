import { Play } from "lucide-react";
import Link from "next/link";
import { titleToSlug } from "@/utils/slugUtils";
import { rangedEvents } from "@/lib/data";
import Image from "next/image";

export default function Card(props: {
  title: string;
  date: Date | string;
  coverUrl: string;
  className?: string;
}) {
  const { title, date, coverUrl, className } = props;

  return (
    <div
      className={`${className} hover:-translate-y-2 transition-all duration-500 shadow-lg`}
    >
      <p className="text-center mb-2 font-sans text-xs md:text-lg">
        {rangedEvents[title as keyof typeof rangedEvents] ||
          new Date(date).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <Link
        href={`/acara/${titleToSlug(title)}`}
        className="xl:w-96 lg:w-72 lg:h-64 md:w-48 cursor-pointer md:h-64 w-36  h-48 relative text-black flex items-end"
      >
        <Image
          src={coverUrl}
          className="rounded-2xl z-0 object-cover"
          alt="placeholder"
          fill
          unoptimized
        />
        <div className="w-full ">
          <div className="relative  font-playfair px-2 md:px-6 max-md:pb-6 lg:px-12 text-md lg:text-2xl flex justify-between items-end md:items-center text-[#FDFF78] z-10 h-24 bg-gradient-to-t from-[#002492] via-[rgba(0,36,146,0.83)] via-70% to-transparent rounded-b-2xl w-full">
            <h2 className="font-medium">{title}</h2>
            <Play fill="#FDFF78" className="size-4 md:size-6 lg:size-8" />
          </div>
        </div>
      </Link>
    </div>
  );
}

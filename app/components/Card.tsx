import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Card(props: {
  title: string;
  date: Date | string;
  coverUrl: string;
  className?: string;
}) {
  const { title, date, coverUrl, className } = props;
  return (
    <div className={`${className}`}>
      <p className="text-center mb-2 font-sans text-md md:text-xl">
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(new Date(date))}
      </p>
      <div className="xl:w-96 lg:w-72 lg:h-64 md:w-48 md:h-64 w-36  h-48 relative text-black flex items-end hover:-translate-y-2 hover:cursor-pointer transition-all duration-200">
        <Image
          src={coverUrl}
          className="rounded-2xl z-0 object-cover"
          alt="placeholder"
          fill
          unoptimized
        />
        <Link href={`/acara/${title}`} className="w-full ">
          <div className="relative cursor-pointer font-playfair px-2 md:px-6 max-md:pb-6 lg:px-12 text-md lg:text-2xl flex justify-between items-end md:items-center text-[#FDFF78] z-10 h-24 bg-gradient-to-t from-[#002492] via-[rgba(0,36,146,0.83)] via-70% to-transparent rounded-b-2xl w-full">
            <h2 className="font-medium">{title}</h2>
            <Play fill="#FDFF78" className="size-4 md:size-6 lg:size-8" />
          </div>
        </Link>
      </div>
    </div>
  );
}

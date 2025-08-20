"use client";

import Link from "next/link";
import navbarFlower from "@/public/navbar_flower.png";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useEventsStore } from "@/utils/useEventsStore";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const { events, fetchEvents } = useEventsStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center bg-navbar min-h-14 md:min-h-24 z-30 absolute top-0 w-full font-playfair">
      <ul className="inline-flex gap-6 md:gap-10 text-[#002492] ml-14 md:ml-32 lg:ml-40 text-lg md:text-2xl lg:text-4xl font-bold">
        <li>
          <Link href={"/"} className="hover:text-blue-700">Utama</Link>
        </li>
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 hover:text-blue-700 transition-colors"
          >
            Acara
            <ChevronDown 
              className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 md:mt-2 bg-[#81e088] shadow-lg border border-black min-w-[180px] md:min-w-[220px] lg:min-w-[260px] z-50 max-w-[90vw] md:max-w-none">
              <Link 
                href="/acara" 
                className="block px-3 py-2 md:px-4 md:py-3 text-sm md:text-lg lg:text-xl text-black hover:bg-[#9be683] transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                Semua Acara
              </Link>
              
              {events.length > 0 && (
                <>
                  <hr className="border-black" />
                  {events.slice(0, 5).map((event) => (
                    <Link
                      key={event.id}
                      href={`/acara/${encodeURIComponent(event.title)}`}
                      className="block px-3 py-2 md:px-4 md:py-3 text-sm md:text-lg lg:text-xl text-black hover:bg-[#9be683] transition-colors truncate"
                      onClick={() => setIsDropdownOpen(false)}
                      title={event.title}
                    >
                      {event.title}
                    </Link>
                  ))}
                  {events.length > 5 && (
                    <Link 
                      href="/acara" 
                      className="block px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm lg:text-base text-black hover:bg-[#9be683] transition-colors italic"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Lihat semua acara...
                    </Link>
                  )}
                </>
              )}
            </div>
          )}
        </li>
      </ul>
      <Image
        alt="Flower"
        src={navbarFlower}
        className="w-14 md:w-28 lg:w-40 absolute left-0 top-0 h-auto"
      />
    </nav>
  );
}

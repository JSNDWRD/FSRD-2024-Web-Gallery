"use client";
import LogoLokasharana from "@/public/logo_lokasharana.png";
import { useEventsStore } from "@/utils/useEventsStore";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import VineSeparator from "./VineSeparator";
import VinesRight from "@/public/vines_right.svg";
import { Event } from "../api/dto";
import { useBreakpointCols } from "./useBreakpointCols";
import Card from "./Card";
import LeftVines from "@/public/home_vines.svg";
import { Loader } from "lucide-react";

export default function Acaras() {
  const { events, fetchEvents, loading } = useEventsStore();
  const cols = useBreakpointCols();

  const eventsPerRow = useMemo(() => {
    return events.reduce((acc: Event[][], item, i) => {
      if (i % cols === 0) acc.push([]);
      acc[acc.length - 1].push(item);
      return acc;
    }, []);
  }, [events, cols]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events.length, fetchEvents]);

  return (
    <div className="mt-32 h-screen">
      <Image
        src={VinesRight}
        alt="vines"
        className="absolute z-0 top-80 right-0 w-32 md:w-48 lg:w-64 object-contain"
        unselectable="on"
        data-aos="fade-left"
        data-aos-duration="2000"
      />
      <Image 
        className="absolute z-0 left-0 top-64 md:top-48 lg:top-64 w-32 md:w-48 xl:w-64 object-contain"
        src={LeftVines}
        alt="vines"
        unselectable="on"
        data-aos="fade-right"
        data-aos-duration="2000"
      />
      <div className="px-4">
        <Image
          src={LogoLokasharana}
          alt="Lokasharana"
          className="w-64 md:w-md lg:w-lg mx-auto"
          data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500"
        />
        <p data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500" className="max-w-7xl w-[70%] text-center mx-auto mt-8 text-md md:text-xl xl:text-2xl font-sans">
          Dari perjalanan panjang penuh harapan, kini saatnya kembali bersua 
          dalam satu perayaan. Antarasta: Parade Wisuda Agustus 2025 FSRD ITB, 
          menjadi ruang untuk merayakan pencapaian, seperti janji yang terwujud 
          dalam pertemuan yang lama dinanti. Momen ini menjadi titik temu
          untuk mengenang perjalanan, menumbuhkan rasa syukur, dan merayakan kebersamaan yang abadi.
        </p>
      </div>

      <div className="w-full mx-auto mb-12">
        {loading && (
          <div className="mt-4 flex w-full gap-3 items-center h-fit text-xl justify-center mx-auto" data-aos="zoom-in" data-aos-duration="2000">
            <Loader className="animate-spin w-12 h-12"/>
            <p>Loading...</p>
          </div>
        )}
        {eventsPerRow.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowIndex < eventsPerRow.length && (
              <div className={`col-span-${cols} my-4`} data-aos="fade-up">
                <VineSeparator />
              </div>
            )}
            <div className={`flex items-center justify-center gap-4 lg:gap-8`}>
              {row.map((e, i) => (
                <Card
                  key={i}
                  title={e.title}
                  date={e.date}
                  coverUrl={e.coverUrl || ""}
                  className={`${i % 2 != 0 && cols == 2 && "translate-y-8"}`}
                  data-aos="fade-up"
                />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

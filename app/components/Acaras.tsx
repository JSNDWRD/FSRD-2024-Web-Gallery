"use client";
import LogoLokasharana from "@/public/logo_lokasharana.png";
import { useEventsStore } from "@/utils/useEventsStore";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import VineSeparator from "./VineSeparator";
import { Event } from "../api/dto";
import { useBreakpointCols } from "./useBreakpointCols";
import Card from "./Card";

export default function Acaras() {
  const { events, fetchEvents } = useEventsStore();
  const cols = useBreakpointCols();

  const eventsPerRow = useMemo(() => {
    return events.reduce((acc: Event[][], item, i) => {
      if (i % cols === 0) acc.push([]);
      acc[acc.length - 1].push(item);
      return acc;
    }, []);
  }, [events, cols]);

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events.length, fetchEvents]);

  return (
    <div className="mt-32">
      <div className="px-4">
        <Image
          src={LogoLokasharana}
          alt="Lokasharana"
          className="w-48 md:w-64 lg:w-lg mx-auto"
        />
        <p className="max-w-2xl text-center mx-auto mt-8 text-2xl font-sans">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          eveniet, non laudantium aperiam sed nisi dignissimos optio architecto
          voluptatibus.
        </p>
      </div>

      <div className="w-full mx-auto mb-12">
        {eventsPerRow.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowIndex < eventsPerRow.length && (
              <div className={`col-span-${cols} my-4`}>
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
                />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

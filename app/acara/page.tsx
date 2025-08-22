"use client";
import { useEventsStore } from "@/utils/useEventsStore";
import { useEffect } from "react";
import Card from "../components/Card";
import HomeFooter from "../components/HomeFooter";

export default function Page() {
  const { events, fetchEvents } = useEventsStore();
  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events.length, fetchEvents]);
  return (
    <div className="mt-32 min-h-screen">
      <h1 className="mb-6 text-7xl font-semibold text-center font-playfair text-[#FEECD4]">
        Semua Acara
      </h1>
      {events.length === 0 && <p>No Events</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 md:px-6 lg:px-24 mx-auto *:justify-self-center mb-16">
        {events.map((e, i) => (
          <Card
            key={i}
            title={e.title}
            date={e.date}
            coverUrl={e.coverUrl || ""}
          />
        ))}
      </div>
      <HomeFooter />
    </div>
  );
}

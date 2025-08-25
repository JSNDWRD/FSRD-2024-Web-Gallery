"use client";
import { useEventsStore } from "@/utils/useEventsStore";
import { useEffect } from "react";
import Card from "../components/Card";
import HomeFooter from "../components/HomeFooter";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Page() {
  const { events, fetchEvents } = useEventsStore();
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
    <div className="h-fit relative overflow-hidden">
      <h1
        className="mb-6 mt-32 text-7xl font-semibold text-center font-playfair text-[#FEECD4]"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Semua Acara
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 md:px-6 lg:px-24 mx-auto *:justify-self-center mb-48 relative z-30">
        {events.map((e, i) => {
          return (
            <span key={i} data-aos="fade-up" data-aos-delay={50 * (i + 1)}>
              <Card title={e.title} date={e.date} coverUrl={e.coverUrl || ""} />
            </span>
          );
        })}
      </div>
      {events.length !== 0 && <HomeFooter />}
    </div>
  );
}

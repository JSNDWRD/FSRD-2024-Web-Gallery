"use client";
import { useEventsStore } from "@/utils/useEventsStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { namaAcara } = useParams();

  const {
    eventImages,
    searchEvents,
    eventComments,
    searchComments,
    events,
    fetchEvents,
    loading,
  } = useEventsStore();

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
    searchEvents(namaAcara?.toString() || "");
    searchComments(namaAcara?.toString() || "");
  }, [searchEvents, searchComments, events.length, fetchEvents, namaAcara]);

  if (loading) {
    return <div>Loading..</div>;
  }

  const validateEvent = events.some(
    (e) => e.title.toLowerCase() == namaAcara?.toString().toLowerCase()
  );

  const event = events.find((e) => e.title === namaAcara)

  if (!validateEvent) {
    return <div>404</div>;
  }

  return (
    <section>
      <div className="h-36"></div>
      <h1 className="mb-4 text-7xl font-semibold text-center font-playfair text-[#FEECD4]">{namaAcara}</h1>
      <h1 className="mb-4 text-6xl font-semibold text-center font-playfair text-[#FEECD4]">{new Date(event?.date || 'titit').toLocaleDateString()}</h1>
      {eventImages.map((e) => (
        <h2 key={e.key}>{e.key}</h2>
      ))}

      <h1 className="mb-4 mt-2 text-2xl font-semibold">Komennya nih</h1>
      {eventComments.map((e) => {
        const commentDate = new Date(e.createdAt).toLocaleDateString();
        return (
          <h2 key={e.id}>
            {e.eventName} - {e.name} - {e.content} - {commentDate}
          </h2>
        );
      })}
    </section>
  );
}

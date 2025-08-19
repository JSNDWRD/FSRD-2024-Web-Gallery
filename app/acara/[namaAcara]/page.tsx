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

  if (!validateEvent) {
    return <div>404</div>;
  }

  return (
    <div>
      <h1 className="mb-4 mt-2 text-2xl font-semibold">Link image acaranya</h1>
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
    </div>
  );
}

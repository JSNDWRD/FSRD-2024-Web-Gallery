"use client";
import { useEventsStore } from "@/utils/useEventsStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import acaraFlowerLeft from "@/public/acara_flower_left.png";
import acaraFlowerRight from "@/public/acara_flower_right.png";
import acaraFlowerRight2 from "@/public/acara_flower_right_2.png";
import bugCenter2 from "@/public/bugs_center_2.png";
import flowLeft from "@/public/flowcomment_left.png";
import flowRight from "@/public/flowcomment_right.png";
import commentPropsLeft from "@/public/comment_props_left.png";
import commentPropsRight from "@/public/comment_props_right.png";
import bugCenter from "@/public/bugs_center_2.png";
import Image from "next/image";
import Comment from "@/app/components/Comment";

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

  const event = events.find((e) => e.title === namaAcara);

  if (!validateEvent) {
    return <div>404</div>;
  }

  return (
    <section className="relative">
      <Image
        src={acaraFlowerLeft}
        className="absolute z-0 left-0 w-[640px] object-contain"
        alt="flower"
        unselectable="on"
      />
      <Image
        src={bugCenter2}
        className="absolute z-0 left-1/4 lg:left-1/2 lg:-translate-x-1/2 top-40 w-20 object-contain"
        alt="flower"
        unselectable="on"
      />
      <Image
        src={acaraFlowerRight}
        className="absolute z-0 right-0 w-[540px] object-contain max-lg:hidden"
        alt="flower"
        unselectable="on"
      />
      <Image
        src={acaraFlowerRight2}
        className="absolute z-0 right-0 w-24 lg:w-56 top-56 lg:top-48 object-contain"
        alt="flower"
        unselectable="on"
      />
      <div className="py-64 z-30 relative min-h-[300vh]">
        <h1 className="mb-4 text-4xl md:text-7xl font-semibold text-center font-playfair text-[#FEECD4]">
          {namaAcara}
        </h1>
        <h2 className="mb-4 text-2xl md:text-5xl text-center font-playfair text-[#FEECD4]">
          {new Date(event?.date || "").toLocaleDateString()}
        </h2>
        {eventImages.map((e) => (
          <h2 key={e.key}>{e.link}</h2>
        ))}
      </div>
      {/* Comment */}
      <div className="bg-comment min-h-96 pt-24 relative">
        <Image
          src={commentPropsLeft}
          className="absolute z-10 w-52 -top-40 md:-top-56 lg:-top-72 left-0 md:w-72 lg:w-96 object-contain"
          alt="flower"
          unselectable="on"
        />
        <Image
          src={commentPropsRight}
          className="absolute z-10 right-0 -top-28 md:-top-48 lg:-top-72 w-24 md:w-48 lg:w-72 object-contain"
          alt="flower"
          unselectable="on"
        />
        <Image
          src={flowLeft}
          className="absolute z-0 top-4 left-0 w-48 lg:w-64 object-contain"
          alt="flower"
          unselectable="on"
        />
        <Image
          src={flowRight}
          className="absolute z-0 right-0 bottom-0 w-64 lg:w-80 object-contain"
          alt="flower"
          unselectable="on"
        />
        <Image
          src={bugCenter}
          className="absolute z-0 -top-40 lg:-top-12 max-lg:right-12 lg:left-2/3 w-24 lg:w-36 object-contain"
          alt="flower"
          unselectable="on"
        />
        <div className="relative z-30">
          <h1 className="mt-16 mb-32 text-4xl md:text-7xl font-semibold text-center font-playfair text-[#FEECD4]">
            Komentar
          </h1>
          <div className="px-6 lg:px-24 mb-6 grid grid-cols-1 *:justify-self-center md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-fit mx-auto">
            <Comment
              eventName={event?.title || ""}
              eventId={event?.id || ""}
              type="POST"
            />
            {eventComments.map((comment, i) => (
              <Comment
                eventName={event?.title || ""}
                eventId={event?.id || ""}
                key={i}
                type="GET"
                name={comment.name}
                date={comment.createdAt}
                content={comment.content}
              />
            ))}
          </div>
          <footer className="text-center text-xl py-4">
            &copy; Antarasta FSRD ITB 2025. All rights reserved.
          </footer>
        </div>
      </div>
    </section>
  );
}

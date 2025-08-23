"use client";
import { useEventsStore } from "@/utils/useEventsStore";
import { useEventSearch } from "@/utils/useEventSearch";
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
import NotFound from "@/app/components/NotFound";
import Aos from "aos";
import "aos/dist/aos.css";
import { rangedEvents } from "@/lib/data";

export default function Page() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const { slug } = useParams();
  const slugString = slug?.toString() || "";

  const { events, images, comments, fetchEvents, fetchImages, fetchComments } =
    useEventsStore();

  const {
    event,
    eventImages,
    eventComments,
    isLoading,
    isSearching,
    searchEvent,
    isValidSlug,
  } = useEventSearch(
    events,
    images,
    comments,
    async (eventName: string) => {
      console.log(`Searching images for event: ${eventName}`);
    },
    async (eventName: string) => {
      console.log(`Searching comments for event: ${eventName}`);
    }
  );

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
    if (images.length === 0) {
      fetchImages();
    }
    if (comments.length === 0) {
      fetchComments();
    }
  }, [
    events.length,
    images.length,
    comments.length,
    fetchEvents,
    fetchImages,
    fetchComments,
  ]);

  useEffect(() => {
    if (slugString && events.length > 0) {
      searchEvent(slugString);
    }
  }, [slugString, events.length, searchEvent]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002492] to-[#001a6b]">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FEECD4] mx-auto mb-4"></div>
          <p className="text-xl text-[#FEECD4]">Memuat acara...</p>
        </div>
      </div>
    );
  }

  if (!isValidSlug) {
    return <NotFound />;
  }

  if (isSearching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002492] to-[#001a6b]">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FEECD4] mx-auto mb-4"></div>
          <p className="text-lg text-[#FEECD4]">Mencari acara...</p>
        </div>
      </div>
    );
  }
  if (!event) {
    return <NotFound />;
  }

  return (
    <section className="relative min-h-screen h-fit overflow-hidden">
      <Image
        src={acaraFlowerLeft}
        className="absolute z-0 left-0 w-[640px] object-contain"
        alt="flower"
        unselectable="on"
        data-aos="fade-right"
      />
      <Image
        src={bugCenter2}
        className="absolute z-0 left-1/4 lg:left-1/2 lg:-translate-x-1/2 top-40 w-20 object-contain"
        alt="flower"
        unselectable="on"
        data-aos="fade-up"
      />
      <Image
        src={acaraFlowerRight}
        className="absolute z-0 right-0 w-[540px] object-contain max-lg:hidden"
        alt="flower"
        unselectable="on"
        data-aos="fade-left"
      />
      <Image
        src={acaraFlowerRight2}
        className="absolute z-0 right-0 w-24 lg:w-56 top-56 lg:top-48 object-contain"
        alt="flower"
        unselectable="on"
        data-aos="fade-left"
      />
      <div
        className="py-64 z-30 relative"
        data-aos="fade-up"
        data-aos-delay="1000"
      >
        <h1 className="mb-4 text-4xl md:text-7xl font-semibold text-center font-playfair text-[#FEECD4]">
          {event.title}
        </h1>
        <h2 className="mb-16 text-2xl md:text-5xl text-center font-playfair text-[#FEECD4]">
          {rangedEvents[event.title as keyof typeof rangedEvents] ||
            new Date(event.date).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </h2>
        {eventImages.length > 0 ? (
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-2 md:px-6 lg:px-24">
            {eventImages.map((img) => (
              <div
                key={img.key}
                className="mb-4 break-inside-avoid rounded-lg overflow-hidden"
              >
                <Image
                  src={img.link}
                  alt={`Event image ${img.key}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#FEECD4] text-lg opacity-75">
            Belum ada gambar untuk acara ini
          </p>
        )}
      </div>

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
        <div className="relative z-30" data-aos="fade-left">
          <h1 className="mt-16 mb-32 text-4xl md:text-7xl font-semibold text-center font-playfair text-[#FEECD4]">
            Komentar
          </h1>
          <div className="px-6 lg:px-24 mb-6 grid grid-cols-1 *:justify-self-center md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-fit mx-auto">
            <Comment eventName={event.title} eventId={event.id} type="POST" />
            {eventComments.map((comment, i) => (
              <Comment
                eventName={event.title}
                eventId={event.id}
                key={comment.id || i}
                type="GET"
                name={comment.name}
                date={comment.createdAt}
                content={comment.content}
              />
            ))}
          </div>
          <footer className="text-center text-xl py-4 text-[#FEECD4]">
            &copy; Antarasta FSRD ITB 2025. All rights reserved.
          </footer>
        </div>
      </div>
    </section>
  );
}

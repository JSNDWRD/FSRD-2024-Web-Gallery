"use client";

import { useEffect } from "react";
import { useEventsStore } from "@/utils/useEventsStore";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import Acaras from "./components/Acaras";
import HomeFooter from "./components/HomeFooter";

export default function Home() {
  const {
    // images, events,
    fetchEvents,
    fetchImages,
    fetchComments,
  } = useEventsStore();

  useEffect(() => {
    fetchEvents();
    fetchImages();
    fetchComments();
  }, [fetchEvents, fetchImages, fetchComments]);

  return (
    <main className="flex flex-col min-h-screen relative">
      <Navbar />
      <Jumbotron />
      <Acaras />
      <HomeFooter />
    </main>
  );
}

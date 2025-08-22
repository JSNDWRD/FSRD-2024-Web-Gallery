"use client";

import { useEffect } from "react";
import { useEventsStore } from "@/utils/useEventsStore";
import Jumbotron from "./components/Jumbotron";
import Acaras from "./components/Acaras";
import HomeFooter from "./components/HomeFooter";

export default function Home() {
  const { fetchEvents, fetchImages, fetchComments } = useEventsStore();

  useEffect(() => {
    fetchEvents();
    fetchImages();
    fetchComments();
  }, [fetchEvents, fetchImages, fetchComments]);

  return (
    <main className="flex flex-col min-h-screen relative">
      <Jumbotron />
      <Acaras />
      <HomeFooter />
    </main>
  );
}

"use client";

import Image from "next/image";
import Countdown from "./Countdown";
import LogoAntarasta from "@/public/logo_antarasta.png";
import flowPinkLeft from "@/public/flowpink_left.png";
import flowPinkRight from "@/public/flowpink_right.png";
import rockRight from "@/public/rock_right.png";
import bugCenter from "@/public/bugs_center.png";
import Link from "next/link";

import { Play } from "lucide-react";
import { useEffect } from "react";
import Aos from "aos";

export default function Jumbotron() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="bg-jumbotron relative pt-24 w-full flex flex-col xl:flex-row items-center justify-center gap-8 min-h-96 py-8 xl:py-32">
      <Image
        className="absolute z-0 -left-4 bottom-0 w-36 lg:w-64 object-contain"
        src={flowPinkLeft}
        alt="flow"
        unselectable="on"
      />
      <Image
        className="absolute z-0 right-0 -top-8 w-48 md:w-64 lg:w-96 object-contain"
        src={flowPinkRight}
        alt="flow"
        unselectable="on"
      />
      <Image
        className="absolute z-0 right-0 -bottom-8 max-md:hidden md:w-40 w-56 object-contain"
        src={rockRight}
        alt="rock"
        unselectable="on"
      />
      <Image
        className="absolute z-0 max-lg:left-1/2 max-lg:-translate-x-1/2 left-1/4 -bottom-24 w-48 object-contain"
        src={bugCenter}
        alt="fly"
        unselectable="on"
        data-aos="fade-up"
        data-aos-delay="500"
      />

      <div
        className="flex flex-col mt-4 xl:flex-row flex-1 w-full items-center xl:justify-center z-30 gap-8 xl:gap-16 font-sans text-center xl:text-left"
        data-aos="fade-up"
      >
        <div className="flex gap-4 md:gap-4 items-center justify-center">
          <Image
            src={LogoAntarasta}
            alt="Antarasta"
            className="w-36 md:w-64 lg:w-72 object-contain"
          />
          <div className="text-sm md:text-lg lg:text-2xl text-left flex flex-col">
            <p>31 Agustus 2025</p>
            <p>ITB Ganesha</p>
            <Link
              href="/"
              className="flex flex-row items-center hover:scale-105 transition-all delay-75 text-md justify-between gap-2 md:gap-4 px-2 py-1 md:px-4 rounded-lg md:rounded-2xl bg-white text-[#002697] mt-4 text-center"
            >
              Selengkapnya{" "}
              <Play className="size-3 md:size-4 stroke-0" fill="#002697" />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Countdown />
        </div>
      </div>
    </div>
  );
}

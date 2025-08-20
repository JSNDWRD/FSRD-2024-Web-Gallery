"use client";

import Image from "next/image";
import Countdown from "./Countdown";
import LogoAntarasta from "@/public/logo_antarasta.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Jumbotron() {
  return (
    <div className="bg-jumbotron bg-red-400 pt-24 lg:top-2 xl:top-12 w-full max-xl:items-center *:text-center md:mt-4 flex xl:flex-row flex-col xl:*:flex-1 gap-4 h-fit py-8 xl:py-32">
      <div className="flex items-center justify-around lg:mt-12 md:pl-20 w-full">
        <div className="flex gap-12">
        <Image
          src={LogoAntarasta}
          alt="Antarasta"
          className="w-44 md:w-64 lg:w-72 object-contain"
          />
        <div className="text-lg lg:text-2xl text-left flex flex-col">
          <p>31 Agustus 2025</p>
          <p>ITB Ganesha</p>
          <Link href="/" className="flex font-semibold flex-row items-center justify-between gap-4 px-6 py-2 rounded-2xl bg-white text-[#002697] mt-4 text-center">
            Selengkapnya <ArrowRight />
          </Link>
        </div>
        </div>
      </div>
      <div className="flex items-center">
        <Countdown />
      </div>
    </div>
  );
}

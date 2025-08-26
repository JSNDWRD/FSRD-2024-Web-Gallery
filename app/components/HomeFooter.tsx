import Image from "next/image";
import footerMobile from "@/public/footer_mobile.webp";
import footerDesktop from "@/public/footer_desktop.webp";
import footerPropsLeft from "@/public/footer_props_left.webp";
import footerPropsRight from "@/public/footer_props_right.webp";
import Link from "next/link";
import { FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

export default function HomeFooter() {
  return (
    <footer className="w-full h-fit relative">
      <div className="absolute inset-0">
        <Image src={footerMobile} fill className="md:hidden z-0" alt="footer" />
        <Image
          src={footerDesktop}
          fill
          className="max-md:hidden z-0"
          alt="footer"
        />
      </div>
      <Image
        src={footerPropsLeft}
        alt="props"
        className="left-0 absolute z-10 object-contain w-32 md:w-64 lg:w-96 -top-28 md:-top-48 lg:-top-80"
        unselectable="on"
      />
      <Image
        src={footerPropsRight}
        alt="props"
        className="right-0 absolute z-10 object-contain w-32 md:w-64 lg:w-96 -top-28 md:-top-52 lg:-top-80"
        unselectable="on"
      />
      <div className="relative mt-6 z-30 flex flex-col justify-between items-center p-6 gap-8 h-full w-full">
        <div className="flex flex-col xl:flex-row justify-center gap-4 items-center font-bold">
          <Link
            href="https://www.instagram.com/fsrditb24/"
            className="md:text-lg flex items-center gap-3 bg-white bg-opacity-90 text-black px-6 py-1 rounded-full hover:-translate-y-0.5 hover:bg-opacity-100 transition-all duration-200 shadow-lg"
          >
            <FaInstagram size={20} /> @fsrditb24
          </Link>
          <Link
            href="https://www.x.com/fsrditb24/"
            className="md:text-lg flex items-center gap-3 bg-white bg-opacity-90 text-black px-6 py-1 rounded-full hover:-translate-y-0.5 hover:bg-opacity-100 transition-all duration-200 shadow-lg"
          >
            <FaXTwitter size={20} /> @FSRDITB24
          </Link>
          <Link
            href="https://www.tiktok.com/@fsrditb2024"
            className="md:text-lg flex items-center gap-3 bg-white bg-opacity-90 text-black px-6 py-1 rounded-full hover:-translate-y-0.5 hover:bg-opacity-100 transition-all duration-200 shadow-lg"
          >
            <FaTiktok size={20} /> @fsrditb24
          </Link>
        </div>
        <p className="text-center text-md md:text-xl font-bold">
          &copy; Antarasta FSRD ITB 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

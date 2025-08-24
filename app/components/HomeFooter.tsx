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
      <div className="relative z-30 flex flex-col justify-between items-center p-6 gap-8 h-full w-full">
        <div className="flex flex-col lg:flex-row justify-center gap-4 items-center font-bold">
          <Link
            href="https://www.instagram.com/fsrditb24/"
            className="text-lg flex items-center gap-3 hover:-translate-y-0.5 transition-all duration-200"
          >
            <FaInstagram size={20} /> @fsrditb24
          </Link>
          <Link
            href="https://www.x.com/fsrditb24/"
            className="text-lg flex items-center gap-3 hover:-translate-y-0.5 transition-all duration-200"
          >
            <FaXTwitter size={20} /> @FSRDITB24
          </Link>
          <Link
            href="https://www.tiktok.com/@fsrditb2024"
            className="text-lg flex items-center gap-3 hover:-translate-y-0.5 transition-all duration-200"
          >
            <FaTiktok size={20} /> @fsrditb24
          </Link>
        </div>
        <p className="text-center text-xl">
          &copy; Antarasta FSRD ITB 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

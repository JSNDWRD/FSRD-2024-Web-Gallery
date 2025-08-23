import Image from "next/image";
import footerMobile from "@/public/footer_mobile.png";
import footerDesktop from "@/public/footer_desktop.png";
import footerPropsLeft from "@/public/footer_props_left.png";
import footerPropsRight from "@/public/footer_props_right.png";

export default function HomeFooter() {
  return (
    <footer className="w-full h-48 relative">
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
      <div className="relative z-30 flex flex-col justify-center items-center p-6 gap-8 h-full w-full">
        <div className="flex gap-6 items-center justify-between">
          <p>@Sosmed 1</p>
          <p>@Sosmed 2</p>
        </div>
        <p className="text-center text-xl">
          &copy; Antarasta FSRD ITB 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

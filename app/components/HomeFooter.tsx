import Image from "next/image";
import footerMobile from "@/public/footer_mobile.png";
import footerDesktop from "@/public/footer_desktop.png";

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

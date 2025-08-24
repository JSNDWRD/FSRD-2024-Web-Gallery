import Image from "next/image";
import SeparatorDesktop from "@/public/separator_desktop.webp";
import SeparatorMobile from "@/public/separator_mobile.webp";

export default function VineSeparator() {
  return (
    <div>
      <Image
        src={SeparatorDesktop}
        alt="Vine"
        className="w-full object-contain max-sm:hidden relative -translate-y-16 -mb-16"
      />
      <Image
        src={SeparatorMobile}
        alt="Vine"
        className="w-full object-contain sm:hidden relative"
      />
    </div>
  );
}

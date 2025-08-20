import Link from "next/link";
import navbarFlower from "@/public/navbar_flower.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center bg-navbar min-h-14 md:min-h-24 z-30 absolute top-0 w-full font-playfair">
      <ul className="inline-flex gap-10 text-[#002492] ml-14 md:ml-32 lg:ml-40 text-lg md:text-2xl lg:text-4xl font-bold">
        <li>
          <Link href={"/"}>Utama</Link>
        </li>
        <li>
          <Link href={"/acara"}>Acara</Link>
        </li>
      </ul>
      <Image
        alt="Flower"
        src={navbarFlower}
        className="w-14 md:w-28 lg:w-40 absolute left-0 top-0 h-auto"
      />
    </nav>
  );
}

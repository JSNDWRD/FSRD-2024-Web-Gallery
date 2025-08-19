import Link from "next/link";
import navbarFlower from "@/public/navbar_flower.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center bg-navbar min-h-14 md:min-h-24">
      <ul className="inline-flex gap-6 ml-18 md:ml-36 lg:ml-48 text-xl md:text-2xl lg:text-3xl">
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
        className="w-20 md:w-36 lg:w-48 absolute left-0 top-0 h-auto"
      />
    </nav>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-default">
      <div className="text-center text-[#FEECD4]">
        <div>
          <h1 className="text-9xl font-bold mb-12">404</h1>
          <Link
            href={"/"}
            className="text-lg lg:text-2xl text-white font-playfair"
          >
            Kembali ke halaman utama
          </Link>
        </div>
      </div>
    </div>
  );
}

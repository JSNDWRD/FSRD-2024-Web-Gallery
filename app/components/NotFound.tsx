import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002492] to-[#001a6b]">
      <div className="text-center text-white">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#FEECD4] mb-4">404</h1>
          <Link href={"/"}>Kembali ke halaman utama</Link>
        </div>
      </div>
    </div>
  );
}

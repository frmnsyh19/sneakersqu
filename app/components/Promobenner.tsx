import Link from "next/link";

export default function PromoBanner() {
  return (
    <div className="w-full bg-black text-white text-center py-2.5 px-4 text-sm">
      <span className="font-medium">
        Diskon 30% untuk semua Sneakers Running
      </span>
      <span className="hidden sm:inline text-gray-300">
        {" "}
        — Berlaku sampai 31 Agustus
      </span>
      <Link
        href="/men/running"
        className="ml-2 underline underline-offset-2 hover:text-gray-200">
        Belanja sekarang
      </Link>
    </div>
  );
}

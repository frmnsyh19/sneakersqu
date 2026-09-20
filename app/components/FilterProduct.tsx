"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const genderOptions = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
];

const kategoriOptions = [
  { label: "Running", value: "running" },
  { label: "Sneakers", value: "sneakers" },
];

const sortOptions = [
  { label: "Terbaru", value: "newest" },
  { label: "Harga Terendah", value: "price_asc" },
  { label: "Harga Tertinggi", value: "price_desc" },
];

export default function FilterProduct() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeGender = searchParams.get("gender"); // "men" | "women" | null
  const activeKategori = searchParams.get("kategori"); // "running" | "sneakers" | null
  const activeSort = searchParams.get("sort") ?? "newest";

  // Helper: update 1 param di URL, sambil pertahanin param lain yang udah ada (misal "q" dari search)
  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function toggleGender(value: string) {
    updateParam("gender", activeGender === value ? null : value);
  }

  function toggleKategori(value: string) {
    updateParam("kategori", activeKategori === value ? null : value);
  }

  function resetFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("gender");
    params.delete("kategori");
    params.delete("sort");
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasActiveFilter =
    activeGender || activeKategori || activeSort !== "newest";

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 border-b border-gray-100">
      {/* Gender */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Gender:</span>
        {genderOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => toggleGender(opt.value)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              activeGender === opt.value
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:border-black"
            }`}>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Kategori */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Kategori:</span>
        {kategoriOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => toggleKategori(opt.value)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              activeKategori === opt.value
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:border-black"
            }`}>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-gray-500">Urutkan:</span>
        <select
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-2 py-1.5 outline-none">
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset filter */}
      {hasActiveFilter && (
        <button
          onClick={resetFilters}
          className="text-sm text-red-500 hover:underline">
          Reset Filter
        </button>
      )}
    </div>
  );
}

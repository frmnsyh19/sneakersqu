"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const genderOptions = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
];

const kategoriOptions = [
  { label: "Running", value: "running" },
  { label: "Sneakers", value: "sneakers" },
];

const brandOptions = ["Nike", "Adidas", "New Balance", "Puma", "Converse"];

const sortOptions = [
  { label: "Terbaru", value: "newest" },
  { label: "Harga Terendah", value: "price_asc" },
  { label: "Harga Tertinggi", value: "price_desc" },
];

export default function ProductFilterSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeGender = searchParams.get("gender");
  const activeKategori = searchParams.get("kategori");
  const activeBrand = searchParams.get("brand");
  const activeSort = searchParams.get("sort") ?? "newest";
  const activeMinPrice = searchParams.get("minPrice") ?? "";
  const activeMaxPrice = searchParams.get("maxPrice") ?? "";

  const [minPrice, setMinPrice] = useState(activeMinPrice);
  const [maxPrice, setMaxPrice] = useState(activeMaxPrice);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  function toggleGender(value: string) {
    updateParams({ gender: activeGender === value ? null : value });
  }

  function toggleKategori(value: string) {
    updateParams({ kategori: activeKategori === value ? null : value });
  }

  function toggleBrand(value: string) {
    updateParams({ brand: activeBrand === value ? null : value });
  }

  function applyPriceRange() {
    updateParams({ minPrice: minPrice || null, maxPrice: maxPrice || null });
  }

  function resetFilters() {
    setMinPrice("");
    setMaxPrice("");
    router.push(pathname);
  }

  const hasActiveFilter =
    activeGender ||
    activeKategori ||
    activeBrand ||
    activeMinPrice ||
    activeMaxPrice ||
    activeSort !== "newest";

  return (
    <div className="border-b border-gray-100 pb-4">
      <div className="flex items-center justify-between py-3">
        <button
          onClick={() => setShowFilterPanel((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4h18M6 8h12M9 12h6M11 16h2"
            />
          </svg>
          Filter
          {hasActiveFilter && (
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
          )}
        </button>

        <select
          value={activeSort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="text-sm border border-gray-300 rounded-md px-2 py-1.5 outline-none">
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Urutkan: {opt.label}
            </option>
          ))}
        </select>
      </div>

      {showFilterPanel && (
        <div className="space-y-4 pt-2">
          {/* Gender */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Gender</p>
            <div className="flex flex-wrap gap-2">
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
          </div>

          {/* Kategori */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Kategori</p>
            <div className="flex flex-wrap gap-2">
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
          </div>

          {/* Brand */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Brand</p>
            <div className="flex flex-wrap gap-2">
              {brandOptions.map((brand) => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    activeBrand === brand
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-gray-700 hover:border-black"
                  }`}>
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Rentang Harga */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Rentang Harga</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-28 border border-gray-300 rounded-md px-2 py-1.5 text-sm"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-28 border border-gray-300 rounded-md px-2 py-1.5 text-sm"
              />
              <button
                onClick={applyPriceRange}
                className="text-sm border border-black px-3 py-1.5 rounded-md hover:bg-gray-50">
                Terapkan
              </button>
            </div>
          </div>

          {hasActiveFilter && (
            <button
              onClick={resetFilters}
              className="text-sm text-red-500 hover:underline">
              Reset semua filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}

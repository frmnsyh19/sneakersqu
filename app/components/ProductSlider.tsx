"use client";

import { useGetProduct } from "@/services/useGetProduct";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const filters = [
  { label: "Semua", value: "all" },
  { label: "Running for Men", value: "running-men" },
  { label: "Running for Women", value: "running-women" },
  { label: "Sneakers", value: "sneakers" },
];

export default function ProductSlider() {
  const [activeFilter, setActiveFilter] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: products, isPending } = useGetProduct();

  const filteredProducts = (products ?? []).filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "sneakers") return p.kategori === "sneakers";

    const [kategori, gender] = activeFilter.split("-");
    return p.kategori === kategori && p.gender === gender;
  });

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -260, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 260, behavior: "smooth" });
  }

  const router = useRouter();

  const handleDetailProduct = (id: string) => {
    router.push(`/belanja/detail/${id}`);
  };

  return (
    <div
      style={{
        backgroundColor: "#F4F1EA",
      }}
      className="w-full px-4 sm:px-8 py-2 flex flex-col gap-3">
      {/* title */}
      <div className="w-full flex flex-col">
        <span className=" font-extrabold text-2xl">The Latest Drops</span>
        <span className="text-sm text-gray-500">
          Stay ahead of the game with our latest sneaker releases. Explore fresh
          styles and discover the pairs worth adding to your rotation.
        </span>
      </div>
      {/* Filter */}
      <div className="w-full flex flex-col">
        <div className="flex flex-nowrap sm:flex-wrap gap-2 mb-6 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`shrink-0 px-4 py-2 text-sm rounded-full border transition-colors ${
                activeFilter === filter.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black"
              }`}>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative">
          <button
            onClick={scrollLeft}
            aria-label="Geser ke kiri"
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-9 h-9 items-center justify-center hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2">
            {filteredProducts.map((product) => (
              <div
                onClick={() => handleDetailProduct(product.id)}
                key={product.id}
                className="snap-start bg-white shrink-0 w-[220px] sm:w-[240px] border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full h-60 bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm capitalize mt-2 text-gray-500 mt-1">
                    {product.kategori}
                  </p>

                  {/* <button
                    onClick={() => handleDetailProduct(product.id)}
                    className="w-full mt-3 bg-black text-white text-xs py-2 rounded-md hover:bg-gray-800">
                    Tambah ke Keranjang
                  </button> */}
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <p className="text-sm text-gray-400 py-10">
                Tidak ada produk di kategori ini.
              </p>
            )}
          </div>

          <button
            onClick={scrollRight}
            aria-label="Geser ke kanan"
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-9 h-9 items-center justify-center hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

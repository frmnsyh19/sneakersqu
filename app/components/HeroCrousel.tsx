"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200",
      title: "Koleksi Running Terbaru",
      subtitle: "Ringan, responsif, siap ngebut",
      href: "/men/running",
    },
    {
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200",
      title: "Road Running Series",
      subtitle: "Buat lari jarak jauh tiap hari",
      href: "/men/running/road",
    },
    {
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200",
      title: "Trail Running Edition",
      subtitle: "Tahan segala medan",
      href: "/men/running/trail",
    },
  ];

  // Auto-geser tiap 4 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  function goToSlide(index: number) {
    setCurrent(index);
  }

  function goToPrev() {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }

  function goToNext() {
    setCurrent((prev) => (prev + 1) % slides.length);
  }

  return (
    <div className="relative h-96 w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-start justify-center px-10 sm:px-16">
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-2">
              {slide.title}
            </h2>
            <p className="text-white/90 text-sm sm:text-base mb-4">
              {slide.subtitle}
            </p>
            <Link
              href={slide.href}
              className="bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-gray-100">
              Belanja Sekarang
            </Link>
          </div>
        </div>
      ))}

      {/* Tombol panah kiri-kanan */}
      <button
        onClick={goToPrev}
        aria-label="Slide sebelumnya"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center">
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
      <button
        onClick={goToNext}
        aria-label="Slide berikutnya"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round" // ✅
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dot indikator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Ke slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

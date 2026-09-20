"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa6";
import NewArrivalProductSlider from "./NewArrivalProductSlider";
import ProductFilterSort from "./FilterProductSearch";

export const DiscoverSearchProduct = ({ query }: { query: string }) => {
  const [searchDiscover, setSearchDiscover] = useState<string | null>();

  const router = useRouter();

  const handleEnterSearchDiscover = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const category = searchDiscover;

    if (e.key === "Enter") {
      // Handle search submission
      router.push(`/discover/${category}`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <p className="text-2xl font-bold capitalize">OOPS – NO RESULTS FOR</p>
        <div className="flex flex-row gap-1">
          <FaQuoteLeft />
          <p className="text-2xl font-bold capitalize">{query}</p>
          <FaQuoteRight />
        </div>
      </div>
      <div className="w-full p-2">
        <label className="input w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="text"
            onChange={(e) => setSearchDiscover(e.target.value)}
            onKeyDown={handleEnterSearchDiscover}
            className="w-full"
            required
            placeholder="Search"
          />
        </label>
      </div>

      <NewArrivalProductSlider />
    </div>
  );
};

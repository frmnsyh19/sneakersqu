import { Archivo } from "next/font/google";
import React from "react";
export const TitleHero = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col p-1">
        <div className="lg:text-9xl text-7xl font-extrabold text-base-100">
          THE <span className="text-lime-300">VOLT</span>
        </div>

        <div className="lg:text-9xl text-7xl font-extrabold text-base-100">
          RUNNER
        </div>
      </div>

      <p className="line-clamp-2 text-gray-500">
        Limited to 500 pairs. Hand-numbered, drop-shipped, gone in hours. This
        is the one you dont wait for.
      </p>

      <div className="flex flex-row gap-2 mt-4">
        <button className="btn rounded-2xl p-4 bg-lime-300 text-center">
          Shop The Drop
        </button>
        <button className="btn btn-outline rounded-2xl border border-white p-4 text-center text-white">
          What Film
        </button>
      </div>
    </div>
  );
};

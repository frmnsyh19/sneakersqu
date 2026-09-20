import React from "react";
import PromoBanner from "./Promobenner";
import HeroCarousel from "./HeroCrousel";

export const HeaderBelanja = () => {
  return (
    <div className="w-full flex flex-col p-0 lg:p-2">
      <PromoBanner />
      <HeroCarousel />
    </div>
  );
};

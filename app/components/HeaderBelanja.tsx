import React from "react";
import PromoBanner from "./Promobenner";
import HeroCarousel from "./HeroCrousel";
import { TitleHero } from "./header/TitleHero";
import { PictureProduct } from "./header/PictureProduct";
import MarquePromosi from "./header/MarquePromosi";

export const HeaderBelanja = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full lg:h-[30rem] bg-neutral justify-between flex flex-col lg:flex-row items-center gap-4 p-2">
        <TitleHero />
        <PictureProduct />
        {/* <PromoBanner />
      <HeroCarousel /> */}
      </div>
      <MarquePromosi />
    </div>
  );
};

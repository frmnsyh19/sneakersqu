import Image from "next/image";
import HeroHeader from "./components/HeroHeader";
import RoomCard from "./components/RoomCard";
import { NavbarSneckers } from "./components/NavbarSneckers";
import { HeaderBelanja } from "./components/HeaderBelanja";
import ProductSlider from "./components/ProductSlider";
import LifestyleGallery from "./components/LifestyleGallery";

export default function Home() {
  return (
    // <div className="flex flex-col items-center justify-center w-full gap-3">
    //   <HeroHeader />
    //   <RoomCard />
    // </div>
    <>
      <div className="w-full flex flex-col gap-1">
        <NavbarSneckers />
        <HeaderBelanja />
        <ProductSlider />
        <LifestyleGallery />
      </div>
    </>
  );
}

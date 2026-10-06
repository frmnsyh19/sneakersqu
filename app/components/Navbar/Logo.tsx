import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="avatar avatar-placeholder">
        <div className="bg-neutral text-neutral-content w-6 lg:w-8 rounded-full">
          <span
            className={`${archivo.className} text-lg lg:text-xl font-bold text-lime-300`}>
            K
          </span>
        </div>
      </div>

      <div className="flex flex-row">
        <span className={`${archivo.className} text-lg lg:text-xl font-bold`}>
          Kicks
        </span>
        <span
          className={`${archivo.className} text-lg lg:text-xl font-bold text-orange-600`}>
          .
        </span>
        <span className={`${archivo.className} text-lg lg:text-xl font-bold`}>
          Club
        </span>
      </div>
    </div>
  );
};

import React from "react";

const testimonials = [
  {
    name: "Dimas R.",
    since: "Member since 2023",
    text: "Copped the Volt Runner in 40 seconds. The numbering card in the box is a nice touch - feels like a collectible, not just a shoe.",
  },
  {
    name: "Dimas R.",
    since: "Member since 2023",
    text: "Copped the Volt Runner in 40 seconds. The numbering card in the box is a nice touch - feels like a collectible, not just a shoe.",
  },
  {
    name: "Dimas R.",
    since: "Member since 2023",
    text: "Copped the Volt Runner in 40 seconds. The numbering card in the box is a nice touch - feels like a collectible, not just a shoe.",
  },
];

export const Feedback = () => {
  return (
    <div className="w-full flex flex-col gap-6 p-3 lg:p-7 justify-start items-center">
      <div className="w-full">
        <p className="text-5xl lg:text-6xl font-extrabold text-start">
          From the club
        </p>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 p-2">
        {testimonials.map((item, i) => (
          <div key={i} className="flex flex-col bg-white rounded-3xl gap-3">
            <div className="w-full p-4 flex flex-col gap-2">
              <div className="p-2 w-full">
                <p className="text-4xl text-lime-300 font-extrabold">{'"'}</p>
              </div>
              <span className="text-sm font-light leading-tight text-gray-400">
                {item.text}
              </span>
            </div>
            <div className="w-full flex flex-col gap-3 p-4 mt-auto">
              <div className="w-full border border-gray-300"></div>
              <div className="w-full flex flex-col">
                <span className="font-bold">{item.name}</span>
                <span className="text-gray-400 text-sm">{item.since}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Yang berubah: flex diganti grid grid-cols-3, jadi selalu 3 kolom dengan
      lebar sama rata. */}
    </div>
  );
};

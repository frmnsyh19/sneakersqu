import React from "react";

export const LeaderBox = () => {
  return (
    <div
      style={{
        backgroundColor: "#141414",
      }}
      className="w-full h-96 flex flex-col justify-center items-center gap-2">
      <span className="text-4xl lg:text-6xl text-center font-extrabold text-white">
        THE NEXT ONE IS
      </span>
      <span className="text-4xl lg:text-6xl font-extrabold text-white">
        <span className="text-red-500 font-extrabold">ALREADY</span>
        COOKING
      </span>
      <span className="text-center text-base-300">
        Drop 005 goes live Friday 9AM sharp. Members get in 30 minutes early —
        and drops have sold out in under an hour before.
      </span>
      <div className="w-full mt-7 flex flex-row gap-3 justify-center items-center">
        <button
          style={{
            backgroundColor: "#FF5A3C",
          }}
          className="p-4 btn rounded-2xl text-center text-white">
          Become a member
        </button>
        <button className="btn btn-outline rounded-2xl text-center text-white border border-white">
          Set a reminder
        </button>
      </div>
    </div>
  );
};

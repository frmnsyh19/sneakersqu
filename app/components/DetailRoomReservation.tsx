"use client";

import React from "react";

interface CreateRoomBody {
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
}

export const DetailRoomReservation = ({ Rooms }: { Rooms: CreateRoomBody }) => {
  return (
    <div className="flex flex-col gap-2 md:p-2">
      <div className="w-full h-80">
        <img src={Rooms.image} className="w-full h-80" alt="" />
      </div>
      <div className="flex flex-col gap-1">
        <b>{Rooms.name}</b>
        <span>{Rooms.description}</span>
      </div>
    </div>
  );
};

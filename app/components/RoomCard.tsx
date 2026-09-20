"use client";

import { useGetRooms } from "@/services/useGetRooms";
import Link from "next/link";
import React from "react";

interface RoomBody {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
}

const RoomCard = () => {
  const { data: rooms } = useGetRooms();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {rooms?.map((item: RoomBody, i: number) => {
        return (
          <div
            key={item.id ?? i}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <img
              src={item.image ?? "https://via.placeholder.com/400x200"}
              alt={item.name ?? "thumbnail"}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              <Link
                href={`/room/detail/${item.id}`}
                className="mt-7 px-4 py-2 bg-amber-400 text-white text-sm rounded-lg hover:bg-blue-700">
                Selengkapnya
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomCard;

"use client";

import { useGetDetailRooms } from "@/services/useGetDetailRooms";
import axios from "axios";
import React, { useEffect } from "react";
import { DetailRoomReservation } from "./DetailRoomReservation";
import ReservationForm from "./ReservationForm";

// type Roomtype = {
//   name: string;
//   description: string;
//   price: number;
//   capacity: number;
//   image: string;
// };

interface CreateRoomBody {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
}

const RoomDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetDetailRooms(id);

  // console.log(data.image, "data");

  if (isLoading || !data) return <p>Loading...</p>;

  const rooms: CreateRoomBody = data;

  return (
    <div className="w-full flex flex-col md:flex-row p-2 lg:p-4 mt-3">
      <div className="w-full flex flex-col md:flex-row p-1 lg:p-2">
        <DetailRoomReservation Rooms={rooms} />
        <ReservationForm Room={rooms} />
      </div>
    </div>
  );
};

export default RoomDetails;

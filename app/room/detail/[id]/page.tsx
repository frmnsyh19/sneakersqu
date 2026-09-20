import RoomDetails from "@/app/components/RoomDetails";
import React from "react";

export default async function DetailRoomReservation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full flex h-full justify-start items-center gap-2">
      <RoomDetails id={id} />
      {/* <h1>Hello word</h1> */}
    </div>
  );
}

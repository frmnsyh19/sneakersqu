import RoomDetails from "@/app/components/RoomDetails";
import React from "react";

export default async function DetailRoom({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full flex h-full justify-start items-center gap-2">
      {/* <RoomDetails id={id} /> */}
      coba
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // ✅ ganti jadi Promise
) {
  try {
    const { id } = await params; // ✅ tambahin await

    // const dataRoom = await prisma.room.findUnique({
    //   where: { id },
    // });

    // if (!dataRoom) {
    //   return NextResponse.json(
    //     { error: "Room tidak ditemukan" },
    //     { status: 404 },
    //   );
    // }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("GET /api/room/detail error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data room" },
      { status: 500 },
    );
  }
}

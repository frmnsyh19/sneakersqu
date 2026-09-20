// app/api/reservation/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Kamu harus login dulu" },
        { status: 401 },
      );
    }

    // ambil "id" dari query string, misal /api/reservation?id=abc123
    const roomId = req.nextUrl.searchParams.get("id");

    if (!roomId) {
      return NextResponse.json(
        { error: "roomId tidak ditemukan di query" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { startDate, endDate, userId } = body;

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Tanggal reservasi wajib diisi" },
        { status: 400 },
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return NextResponse.json(
        { error: "Tanggal check-out harus setelah check-in" },
        { status: 400 },
      );
    }

    // Ambil data Room dari database, hitung ulang price di server (jangan percaya dari client)
    // const room = await prisma.room.findUnique({ where: { id: roomId } });

    // if (!room) {
    //   return NextResponse.json(
    //     { error: "Room tidak ditemukan" },
    //     { status: 404 },
    //   );
    // }

    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    // const price = nights * room.price;

    // // Cek bentrok jadwal
    // const overlapping = await prisma.reservation.findFirst({
    //   where: {
    //     roomId,
    //     status: { not: "cancelled" },
    //     AND: [{ startDate: { lt: end } }, { endDate: { gt: start } }],
    //   },
    // });

    // if (overlapping) {
    //   return NextResponse.json(
    //     { error: "Room sudah dibooking di rentang tanggal tersebut" },
    //     { status: 409 },
    //   );
    // }

    console.log("=== DEBUG ===");
    console.log("session.user.id:", session.user.id);

    const userExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    console.log("user ada di db?", userExists);
    console.log("=============");

    // const reservation = await prisma.reservation.create({
    //   data: {
    //     roomId,
    //     userId: userId,
    //     startDate: start,
    //     endDate: end,
    //     price,
    //   },
    // });

    return NextResponse.json([
      { status: 200 },
      { message: "coba si ini berhasil ga ya" },
    ]);

    // return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("POST /api/reservation error:", error);
    return NextResponse.json(
      { error: "Gagal membuat reservasi" },
      { status: 500 },
    );
  }
}

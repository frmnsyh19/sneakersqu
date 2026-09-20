import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

// GET /api/rooms — ambil semua room (buat nampilin list di halaman)
export async function GET() {
  try {
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("GET /api/rooms error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data room" },
      { status: 500 },
    );
  }
}

// POST /api/rooms — bikin room baru + upload gambar
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string | null;
    const priceRaw = formData.get("price") as string;
    const capacityRaw = formData.get("capacity") as string;
    const file = formData.get("image") as File | null;

    // Validasi dasar — field wajib harus ada
    if (!name || !priceRaw || !capacityRaw) {
      return NextResponse.json(
        { error: "Nama, harga, dan kapasitas wajib diisi" },
        { status: 400 },
      );
    }

    const price = Number(priceRaw);
    const capacity = Number(capacityRaw);

    if (Number.isNaN(price) || Number.isNaN(capacity)) {
      return NextResponse.json(
        { error: "Harga dan kapasitas harus berupa angka" },
        { status: 400 },
      );
    }

    let imageUrl: string | null = null;

    // Upload gambar ke Vercel Blob kalau ada file yang dikirim
    if (file && file.size > 0) {
      // Validasi tipe & ukuran file sebelum upload, biar nggak boros kuota
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "File harus berupa gambar" },
          { status: 400 },
        );
      }

      const MAX_SIZE = 4 * 1024 * 1024; // 4MB, di bawah limit body request Vercel (4.5MB)
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: "Ukuran gambar maksimal 4MB" },
          { status: 400 },
        );
      }

      const blob = await put(`rooms/${Date.now()}-${file.name}`, file, {
        access: "public",
      });

      imageUrl = blob.url;
    }

    // const room = await prisma.room.create({
    //   data: {
    //     name,
    //     description,
    //     price,
    //     capacity,
    //     image: imageUrl,
    //   },
    // });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("POST /api/rooms error:", error);
    return NextResponse.json({ error: "Gagal membuat room" }, { status: 500 });
  }
}

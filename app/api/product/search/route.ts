import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
          { gender: { contains: query, mode: "insensitive" } },
          { kategori: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 6, // maksimal 6 hasil
      orderBy: { name: "asc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products/search error:", error);
    return NextResponse.json(
      { error: "Gagal mencari produk" },
      { status: 500 },
    );
  }
}

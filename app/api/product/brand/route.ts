import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      select: {
        brand: true,
      },
      distinct: ["brand"],
    });

    return NextResponse.json(data);
  } catch (err) {
    console.log("messgae for /api/product/brand", err);
    return NextResponse.json(
      {
        message: "We Went Something Wrong",
      },
      { status: 500 },
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const detailProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true, // 👈 join ke ProductImage
        sizes: true, // 👈 join ke ProductSize
      },
    });

    return NextResponse.json(detailProduct, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceRaw = formData.get("price") as string;
    const gender = formData.get("gender") as string;
    const kategori = formData.get("kategori") as string;
    const brand = formData.get("brand") as string;
    const sizesRaw = formData.get("sizes") as string; // JSON string: [{ size, stock }]
    const files = formData.getAll("images") as File[]; // banyak file sekaligus

    if (!name || !priceRaw || !gender || !kategori || !brand) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 },
      );
    }

    const price = Number(priceRaw);
    if (Number.isNaN(price)) {
      return NextResponse.json(
        { error: "Harga harus berupa angka" },
        { status: 400 },
      );
    }

    if (!files || files.length === 0 || files.every((f) => f.size === 0)) {
      return NextResponse.json(
        { error: "Minimal 1 gambar produk wajib diupload" },
        { status: 400 },
      );
    }

    let sizes: { size: string; stock: number }[] = [];
    try {
      sizes = JSON.parse(sizesRaw || "[]");
    } catch {
      return NextResponse.json(
        { error: "Format data ukuran tidak valid" },
        { status: 400 },
      );
    }

    if (sizes.length === 0) {
      return NextResponse.json(
        { error: "Minimal 1 ukuran wajib ditambahkan" },
        { status: 400 },
      );
    }

    // Validasi tiap file gambar sebelum upload
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: `File "${file.name}" bukan gambar` },
          { status: 400 },
        );
      }
      if (file.size > 4 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File "${file.name}" melebihi 4MB` },
          { status: 400 },
        );
      }
    }

    // Upload semua gambar ke Vercel Blob secara paralel
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const blob = await put(`products/${Date.now()}-${file.name}`, file, {
          access: "public",
        });
        return blob.url;
      }),
    );

    const [mainImage, ...galleryImages] = uploadedUrls; // gambar pertama = thumbnail utama

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        gender,
        kategori,
        brand,
        image: mainImage,
        images: {
          create: galleryImages.map((url) => ({ url })),
        },
        sizes: {
          create: sizes.map((s) => ({
            size: s.size,
            stock: Number(s.stock) || 0,
          })),
        },
      },
      include: { images: true, sizes: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Gagal membuat produk" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 },
    );
  }
}

import { getSession } from "@/lib/GetSession";
import { CartItem } from "@/lib/Session";
import { NextRequest, NextResponse } from "next/server";
// import { getSession } from "@/lib/getSession";
// import { CartItem } from "@/lib/session";

// GET /api/cart — ambil isi cart dari session
export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json(session.cart);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil cart" },
      { status: 500 },
    );
  }
}

// POST /api/cart — tambah item ke cart
export async function POST(req: NextRequest) {
  try {
    const body: CartItem = await req.json();
    const { productId, name, image, price, size, quantity } = body;

    if (!productId || !size || !quantity) {
      return NextResponse.json(
        { error: "Data item tidak lengkap" },
        { status: 400 },
      );
    }

    const session = await getSession();

    // Cek apakah produk+size yang sama udah ada di cart
    const existingIndex = session.cart.findIndex(
      (item) => item.productId === productId && item.size === size,
    );

    if (existingIndex !== -1) {
      // Udah ada, tambahin quantity-nya
      session.cart[existingIndex].quantity += quantity;
    } else {
      // Belum ada, push item baru
      session.cart.push({ productId, name, image, price, size, quantity });
    }

    await session.save(); // WAJIB dipanggil, ini yang nulis ke cookie

    return NextResponse.json(session.cart, { status: 201 });
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json(
      { error: "Gagal menambah ke cart" },
      { status: 500 },
    );
  }
}

// PATCH /api/cart — update quantity item tertentu (set langsung, bukan nambah)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, size, quantity } = body;

    if (!productId || !size || quantity == null) {
      return NextResponse.json(
        { error: "productId, size, dan quantity wajib diisi" },
        { status: 400 },
      );
    }

    if (quantity < 1) {
      return NextResponse.json(
        { error: "Quantity minimal 1" },
        { status: 400 },
      );
    }

    const session = await getSession();

    const itemIndex = session.cart.findIndex(
      (item) => item.productId === productId && item.size === size,
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Item tidak ditemukan di cart" },
        { status: 404 },
      );
    }

    session.cart[itemIndex].quantity = quantity;
    await session.save();

    return NextResponse.json(session.cart);
  } catch (error) {
    console.error("PATCH /api/cart error:", error);
    return NextResponse.json(
      { error: "Gagal update quantity" },
      { status: 500 },
    );
  }
}

// DELETE /api/cart — hapus item dari cart, pakai query ?productId=...&size=...
export async function DELETE(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("productId");
    const size = req.nextUrl.searchParams.get("size");

    if (!productId || !size) {
      return NextResponse.json(
        { error: "productId dan size wajib diisi" },
        { status: 400 },
      );
    }

    const session = await getSession();

    session.cart = session.cart.filter(
      (item) => !(item.productId === productId && item.size === size),
    );

    await session.save();

    return NextResponse.json(session.cart);
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus item" },
      { status: 500 },
    );
  }
}

import { SessionOptions } from "iron-session";

export type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};

export type SessionData = {
  cart: CartItem[];
};

export const defaultSession: SessionData = {
  cart: [],
};

export const sessionOptions: SessionOptions = {
  // WAJIB diisi dari .env, minimal 32 karakter — ini kunci buat enkripsi cookie session
  password: process.env.SESSION_SECRET as string,
  cookieName: "shop_cart_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // https only di production
    httpOnly: true, // gak bisa diakses lewat JS di browser, lebih aman dari XSS
  },
};
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData, defaultSession } from "@/lib/Session";

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  // Kalau session baru/kosong, kasih default value biar gak undefined
  if (!session.cart) {
    session.cart = defaultSession.cart;
  }

  return session;
}

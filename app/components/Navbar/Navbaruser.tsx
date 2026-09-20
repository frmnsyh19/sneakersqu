"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function Navbaruser() {
  const pathname = usePathname();

  const hideNavbarPaths =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/belanja");

  if (hideNavbarPaths) return null;

  return <Navbar />;
}

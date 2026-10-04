"use client";

import React, { useEffect, useState } from "react";
import { Cart } from "./Cart";
import { SearchNavbar } from "./SearchNavbar";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "./Navbar/Logo";
import Link from "next/link";

export const NavbarSneckers = () => {
  const [category, setCategory] = useState<string | null>();
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (category) {
      router.push(`/discover/${category}`);
    }
  }, [category, router]);

  const session = useSession();

  return (
    <>
      <div
        style={{
          backgroundColor: "#F4F1EA",
        }}
        className="w-full flex justify-center items-center">
        <div
          className="w-full"
          style={{
            backgroundColor: "#F4F1EA",
          }}>
          <div className="drawer">
            <input
              id="my-drawer-2"
              type="checkbox"
              className="drawer-toggle lg:hidden"
            />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="navbar  w-full">
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost drawer-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </label>
                </div>
                <div className="mx-2 flex-1 px-2 flex-row">
                  <Logo />
                </div>
                <div className="hidden flex-row gap-2 items-center lg:flex">
                  <ul className="menu menu-horizontal">
                    {/* Navbar menu content here */}
                    <li>
                      <a className=" text-lg">Home</a>
                    </li>
                    <li>
                      <a
                        className="text-lg"
                        onClick={() => setCategory("running")}>
                        Running
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-lg"
                        onClick={() => setCategory("sneckers")}>
                        Sneckers
                      </a>
                    </li>
                    {session ? (
                      <li className="pt-2 md:pt-0">
                        <button
                          onClick={() => signOut()}
                          className="md:hidden py-2.5 px-4 bg-orange-400 text-white hover:bg-orange-500 rounded-sm">
                          Sign Out
                        </button>
                      </li>
                    ) : (
                      <li className="pt-2 md:pt-0">
                        <Link
                          href="/signin"
                          className="py-2.5 px-4 bg-orange-400 text-white hover:bg-orange-500 rounded-sm">
                          Sign In
                        </Link>
                      </li>
                    )}
                    {/* pesanan saya jika sudah login */}
                  </ul>
                </div>
                <div className=" flex justify-end  flex-row gap-1">
                  <div className="flex flex-row gap-1">
                    <SearchNavbar setActiveSearch={setActiveSearch} />
                    <div className={activeSearch ? "hidden md:block" : "block"}>
                      <Cart />
                    </div>
                  </div>
                </div>
              </div>
              {/* Page content here */}
              {/* Content */}
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"></label>
              <ul className="menu bg-base-200 min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <a className=" text-lg">Home</a>
                </li>
                <li>
                  <a className="text-lg" onClick={() => setCategory("running")}>
                    Running
                  </a>
                </li>
                <li>
                  <a
                    className="text-lg"
                    onClick={() => setCategory("sneckers")}>
                    Sneckers
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

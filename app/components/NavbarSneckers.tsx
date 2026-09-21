"use client";

import { useGetCart } from "@/services/useCart";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Cart } from "./Cart";
import { SearchNavbar } from "./SearchNavbar";
import { addParams } from "@/store/SearchSlice";
import { useRouter } from "next/navigation";

export const NavbarSneckers = () => {
  const [category, setCategory] = useState<string | null>();

  const router = useRouter();

  useEffect(() => {
    if (category) {
      router.push(`/discover/${category}`);
    }
  }, [category, router]);

  return (
    <>
      <div className="drawer">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle lg:hidden"
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
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
            <div className="mx-2 flex-1 px-2">Navbar Title</div>
            <div className="hidden flex-row gap-2 items-center lg:flex">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <a className=" text-lg">Home</a>
                </li>
                <li>
                  <Link href={"/discover"} className=" text-lg">
                    Discover
                  </Link>
                </li>
                <li>
                  <a className="text-lg">About</a>
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
                <li>
                  <a className="text-lg" onClick={() => setCategory("formal")}>
                    Formal
                  </a>
                </li>
              </ul>
            </div>
            <div className=" flex justify-end  flex-row gap-1">
              <div className="flex flex-row gap-1">
                <SearchNavbar />
                <Cart />
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
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

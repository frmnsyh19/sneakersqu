"use client";

import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
const Navlink = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  console.log(session, "session");

  return (
    <>
      {session?.user ? (
        <div className="flex justify-end items-center md:order-2">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img src={session.user.image || "/avatar.svg"} />
            </div>
          </div>
        </div>
      ) : null}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center p-2 rounded-md text-sm text-gray-500 md:hidden hover:bg-gray-100">
        {isOpen ? (
          <IoClose className="size-8" />
        ) : (
          <IoMenu className="size-8" />
        )}
      </div>
      <div
        className={clsx("w-full md:block md:w-auto", {
          hidden: !isOpen,
        })}>
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-10 md:p-0 md:border-0 md:bg-white">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/room"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
              Rooms
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
              Contact
            </Link>
          </li>
          {session && (
            <>
              <li>
                <Link
                  href="/myreservation"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
                  My Reservation
                </Link>
              </li>
              {session.user.role === "admin" && (
                <>
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/manageroom"
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
                      Manage Room
                    </Link>
                  </li>
                </>
              )}
            </>
          )}

          {/* validasi btn signin & signout */}
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
        </ul>
      </div>
    </>
  );
};

export default Navlink;

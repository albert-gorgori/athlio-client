import { NAVBAR_HEIGHT } from "../lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-4 px-4 bg-primary-700 text-black">
        <div className="flex w-full items-center gap-4 md:gap-6">
          <Link
            href="/"
            className="cursor-pointer hover:!text-primary-300"
            scroll={false}
          >
            <div className="flex items-center">
              <Image
                src="/android-logo-big.png"
                alt="Athlio Logo"
                width={36}
                height={36}
                className="w-8 h-8"
              />
              <div className="text-lg font-bold text-blue-500">
                THLIO
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

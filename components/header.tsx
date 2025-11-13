"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Check if current page is LOGIN page
  const isLogin =
    pathname === "/" ||
    pathname === "/login" ||
    pathname.includes("login-auth") ||
    pathname.includes("authenticate");

  return (
    <header className="w-full bg-transparent py-4">
      <div className="w-full px-4">

        {/* ========================
           SPECIAL LOGIN HEADER
           Logo LEFT + Text CENTER
        ========================= */}
        {isLogin && (
          <div className="flex items-center justify-center gap-6">

            {/* Logo on LEFT */}
            <Image
              src="/karnataka-emblem.png"
              alt="Karnataka Government Emblem"
              width={85}
              height={85}
              className="object-contain"
            />

            {/* Text in CENTER */}
            <div className="flex flex-col text-center leading-tight">
              <h1 className="text-3xl font-bold text-blue-900">
                Department of Factories, Boilers, Industrial Safety and Health
              </h1>
              <p className="text-md text-blue-800 mt-1">
                Factories & Boilers Information System (FBIS)
              </p>
            </div>

          </div>
        )}

        {/* ========================
           DEFAULT HEADER (CENTERED)
        ========================= */}
        {!isLogin && (
          <div className="flex items-center justify-center gap-6">

            <div className="flex flex-col items-center">
              <Image
                src="/karnataka-emblem.png"
                alt="Karnataka Government Emblem"
                width={80}
                height={80}
                className="object-contain"
              />
              <p className="text-[11px] text-gray-600 -mt-1">
                Government of Karnataka
              </p>
            </div>

            <div className="flex flex-col text-center leading-tight">
              <h1 className="text-2xl font-semibold text-blue-900">
                Department of Factories, Boilers, Industrial Safety and Health
              </h1>
              <p className="text-sm text-blue-700 mt-1">
                Factories & Boilers Information System (FBIS)
              </p>
            </div>

          </div>
        )}

      </div>
    </header>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, X } from "lucide-react";



interface NavDropdownProps {
  label: string;
  items: { label: string; href: string }[];
}

function NavDropdown({ label, items }: NavDropdownProps) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="
          relative flex items-center gap-1 px-4 py-3 
          text-blue-700 font-medium rounded-md transition-all duration-300
          hover:bg-gradient-to-r hover:from-[#3B5BFF] hover:to-[#4C3DFF] hover:text-white
          hover:shadow-[0_0_12px_rgba(59,91,255,0.6)]
        "
      >
        {label}
        <ChevronDown
          size={16}
          className="transition-transform group-hover:rotate-180"
        />

        {/* underline animation */}
        <span
          className="
            absolute bottom-1 left-1/2 w-0 h-[2px] 
            bg-white transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]
          "
        ></span>
      </button>

      {/* Dropdown menu */}
      <div className="hidden group-hover:block absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg z-50">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="
              block px-4 py-3 text-sm text-blue-700 transition-all
              hover:bg-gradient-to-r hover:from-[#3B5BFF] hover:to-[#4C3DFF] hover:text-white
              hover:shadow-[0_0_10px_rgba(59,91,255,0.5)]
            "
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Magnetic hover effect
  const handleMouseMove = (e: any) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    target.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px) scale(1.03)`;
  };

  const handleMouseLeave = (e: any) => {
    const target = e.currentTarget;
    target.style.transform = "translate(0px,0px) scale(1)";
  };

  return (
    <>
      <nav className="bg-white/60 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* LEFT */}
            <div className="flex items-center gap-1">
              <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <NavDropdown
                  label="Services - Factories"
                  items={[
                    { label: "Approval of Plans", href: "#" },
                    { label: "Issue of License", href: "#" },
                    { label: "Renewal", href: "/renewal" },
                  ]}
                />
              </div>

              <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <NavDropdown
  label="Services - Boilers"
  items={[
    
    { label: "Application For Approval Of Boiler / Boiler Component Manufacturing Drawings", href: "/boiler-approval" },
    { label: "Registration Of Boilers", href: "/registration" },
    { label: "Recognition for Boiler Repairer/Erector", href: "#" },
    { label: "Renewal Recognition for Boiler Manufacturer", href: "#" },
  ]}
/>

              </div>

              <Link
                href="#"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="
                  relative px-4 py-3 text-blue-700 font-medium rounded-md transition-all
                  hover:bg-gradient-to-r hover:from-[#3B5BFF] hover:to-[#4C3DFF] hover:text-white
                  hover:shadow-[0_0_12px_rgba(59,91,255,0.6)]
                "
              >
                Application Status
                <span className="
                  absolute bottom-1 left-1/2 w-0 h-[2px] 
                  bg-white transition-all duration-300 hover:w-4/5 hover:left-[10%]
                "></span>
              </Link>

              <Link
                href="#"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="
                  relative px-4 py-3 text-blue-700 font-medium rounded-md transition-all
                  hover:bg-gradient-to-r hover:from-[#3B5BFF] hover:to-[#4C3DFF] hover:text-white
                  hover:shadow-[0_0_12px_rgba(59,91,255,0.6)]
                "
              >
                Boiler Manufacturer
                <span className="
                  absolute bottom-1 left-1/2 w-0 h-[2px] 
                  bg-white transition-all duration-300 hover:w-4/5 hover:left-[10%]
                "></span>
              </Link>

              <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <NavDropdown
                  label="More"
                  items={[
                    { label: "Boiler Erector", href: "#" },
                    { label: "FAQ", href: "#" },
                    { label: "Help Line", href: "#" },
                  ]}
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <NavDropdown
                  label="My Account"
                  items={[
                    { label: "Profile", href: "#" },
                    { label: "Settings", href: "#" },
                    { label: "Applications", href: "#" },
                  ]}
                />
              </div>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="
                  flex items-center gap-2 px-4 py-2 text-white font-medium rounded-lg
                  bg-gradient-to-r from-[#3B5BFF] to-[#4C3DFF]
                  hover:shadow-[0_0_18px_rgba(59,91,255,0.9)] transition-all
                "
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-blue-900">Confirm Logout</h3>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={22} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  router.push("/");
                }}
                className="
                  flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

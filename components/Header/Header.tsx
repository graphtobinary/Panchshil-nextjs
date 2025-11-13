"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavItemChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  child?: NavItemChild[];
}

export function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { label: "About", href: "/about" },
    { label: "Residential", href: "/residential" },
    { label: "Office Parks", href: "/office-parks" },
    { label: "Data Centres", href: "/data-centres" },
    { label: "Hospitality", href: "/hospitality" },
    { label: "Retail & F&B", href: "/retail" },
    {
      label: "International Projects",
      href: "/international-projects",
      child: [
        { label: "Dubai", href: "/dubai" },
        { label: "Maldives", href: "/maldives" },
        { label: "Sri Lanka", href: "/sri-lanka" },
      ],
    },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        {/* Logo */}
        <div className="flex justify-center pt-8 pb-4">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/assets/images/panchshil-logo.png"
              alt="Panchshil"
              width={98}
              height={98}
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex justify-center">
          <ul className="flex flex-wrap justify-center gap-6 lg:gap-12 text-white">
            {navItems.map((item) => (
              <li key={item.href} className="relative">
                <div
                  className={`relative ${item.child ? "pb-3" : ""}`}
                  onMouseEnter={() => item.child && setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className="text-sm lg:text-lg hover:opacity-80 transition-opacity font-light block"
                  >
                    {item.label}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.child && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ${
                        hoveredItem === item.href
                          ? "opacity-100 visible"
                          : "opacity-0 invisible pointer-events-none"
                      }`}
                      style={{ marginTop: "-0.5rem" }}
                    >
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg min-w-[160px] py-2">
                        <ul className="flex flex-col">
                          {item.child.map((childItem) => (
                            <li key={childItem.href}>
                              <Link
                                href={childItem.href}
                                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors hover:font-medium"
                              >
                                {childItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

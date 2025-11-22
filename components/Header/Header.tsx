"use client";

import { MetaDataProps } from "@/interfaces";
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

export function Header({ metaData }: { metaData: MetaDataProps }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
      <title>{metaData.meta_title}</title>
      <meta name="description" content={metaData.meta_description} />
      <meta name="canonical" content={metaData.canonical_tag} />
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        {/* Logo and Mobile Menu Button */}
        <div className="relative flex justify-center items-center pt-8 pb-4">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/assets/images/panchshil-logo.png"
              alt="Panchshil"
              width={98}
              height={98}
            />
          </Link>

          <button
            type="button"
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 items-center justify-center w-12 h-12 rounded-full   text-white"
            aria-label="Toggle navigation menu"
            onClick={toggleMobileMenu}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex justify-center">
          <ul className="flex flex-wrap justify-center gap-3 lg:gap-12 text-white">
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
                                onClick={closeMobileMenu}
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white text-black shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            {/* <span className="font-semibold text-lg text-black-chocolate">
              Menu
            </span> */}
            <button
              type="button"
              className="text-black-chocolate text-2xl"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              ×
            </button>
          </div>
          <nav className="p-6">
            <ul className="flex flex-col gap-4 text-black-chocolate">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-lg font-light hover:text-gray-600 transition-colors block"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                  {item.child && (
                    <ul className="mt-2 ml-4 space-y-2 text-sm text-gray-600">
                      {item.child.map((childItem) => (
                        <li key={childItem.href}>
                          <Link
                            href={childItem.href}
                            className="block hover:text-black transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {childItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

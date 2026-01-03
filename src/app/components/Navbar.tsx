// src/app/components/Navbar.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

const MENU_ITEMS = [
  { name: "Beranda", href: "/" },
  { name: "Berita", href: "/berita" },
  { name: "Profile", href: "/profile" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
] as const;

const PROFILE_SUBMENU = [
  { name: "Sejarah Sekolah", href: "/profile/sejarah" },
  { name: "Visi & Misi", href: "/profile/visi-misi" },
  { name: "Guru & Staf", href: "/profile/guru" },
  { name: "Extrakurikuler", href: "/profile/extrakurikuler" },
  { name: "Fasilitas", href: "/profile/fasilitas" },
] as const;

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  
  const profileRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (profileRef.current && profileRef.current.contains(target)) return;
      if (mobileMenuRef.current && mobileMenuRef.current.contains(target)) return;
      setIsProfileOpen(false);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsProfileOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-dark/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Desktop menu */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              
              // Profile with submenu
              if (item.name === "Profile") {
                return (
                  <div
                    key={item.href}
                    ref={profileRef}
                    className="relative group"
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (typeof window !== "undefined" && window.innerWidth >= 768) {
                          e.preventDefault();
                          setIsProfileOpen(!isProfileOpen);
                        }
                      }}
                      aria-expanded={isProfileOpen}
                      className={`hover:text-primary transition-colors font-medium duration-300 ${
                        isActive ? " text-primary" : ""
                      }`}
                    >
                      {item.name}{" "}
                      <ChevronDownIcon
                        className={`w-4 h-4 inline-block ml-2 text-gray-600 dark:text-gray-300 transform transition-transform ${
                          isProfileOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </Link>
                    
                    {/* Desktop dropdown */}
                    <div
                      className={`${
                        isProfileOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible translate-y-1"
                      } absolute left-0 mt-2 w-56 rounded-lg bg-white dark:bg-dark/80 border border-gray-200 dark:border-gray-700 shadow-lg group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all`}
                    >
                      <div className="py-2">
                        {PROFILE_SUBMENU.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:text-primary transition-colors font-medium duration-300 ${
                    isActive ? " text-primary" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800 transition-colors cursor-pointer duration-300 dark:text-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </button>
            
            <a
              href="https://lms-proyonanggan9.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
            >
              Masuk
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden">
            <div className="py-4 space-y-4">
              {MENU_ITEMS.map((item, index) => {
                if (item.name === "Profile") {
                  return (
                    <div key={index}>
                      <button
                        onClick={() => setIsProfileOpen((s) => !s)}
                        className="w-full text-left py-2 hover:text-primary transition-colors font-medium duration-300 flex items-center justify-between px-4"
                      >
                        <span className="flex items-center gap-2">
                          {item.name}
                        </span>
                        <ChevronDownIcon
                          className={`w-4 h-4 ml-2 transform transition-transform ${
                            isProfileOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                      {isProfileOpen && (
                        <div className="pl-6">
                          {PROFILE_SUBMENU.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={toggleMobileMenu}
                              className="block py-2 hover:text-primary transition-colors font-medium duration-300"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={index} onClick={toggleMobileMenu}>
                    <Link
                      href={item.href}
                      className="block py-2 hover:text-primary transition-colors font-medium duration-300"
                    >
                      {item.name}
                    </Link>
                  </div>
                );
              })}

              <div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center py-2 hover:text-primary transition-colors px-4"
                >
                  {theme === "dark" ? (
                    <>
                      <SunIcon className="w-6 h-6 mr-2" /> Light Mode
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-6 h-6 mr-2" /> Dark Mode
                    </>
                  )}
                </button>
              </div>
              
              <div>
                <a
                  href="https://lms-proyonanggan9.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 px-4 py-2 bg-primary text-white text-center rounded-lg shadow"
                >
                  Masuk
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
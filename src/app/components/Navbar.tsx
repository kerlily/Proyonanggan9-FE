"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTheme } from "../context/ThemeContext";
import Image from 'next/image'

const Navbar = () => {
  const {theme, toggleTheme} = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Berita", href: "/berita" },
    { name: "Projects", href: "/projects" },
    { name: "Certification", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-dark/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4">
        {/* dekstop menu */}
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <Image src="/icon.png" alt="logo" width={40} height={40} />

          {/* desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
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
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100   hover:text-primary dark:hover:bg-gray-800 transition-colors cursor-pointer duration-300 dark:text-white">
              {theme === "dark" ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </button>
          </div>
 {/* mobile menu button */}
              <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                {
                    isMobileMenuOpen ? (<XMarkIcon className="w-6 h-6"/>) : (<Bars3Icon className="w-6 h-6"/>)
                }
              </button>

        </div>

       

        {/* mobile menu */}
        {
            isMobileMenuOpen && (
            <div className="md:hidden ">
                <div className="py-4 space-y-4">
                    {
                        menuItems.map((item, index) => (
                            <div key={index} onClick={toggleMobileMenu} >
                                <Link href={item.href} className="block py-2 hover:text-primary transition-colors font-medium duration-300">{item.name}</Link>
                            </div>
                        ))
                    }

                    <div>
                        <button onClick={toggleTheme} className="flex items-center py-2 hover:text-primary transition-colors">
                            {theme === "dark" ? (
                                <><SunIcon className="w-6 h-6" /> Light Mode</>
                            ) : (
                                <><MoonIcon className="w-6 h-6" /> Dark Mode</>
                            )}
                        </button>
                    </div>
                    
                </div>

            </div>
            )

        }
      </div>
    </nav>
  );
};

export default Navbar;
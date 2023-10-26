import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SignInButton from "./SignInButton";
import { useRouter } from "next/router";

const Header = () => {
  const isAdmin = true;
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  const linkStyles = (href: string) => {
    return isActive(href)
      ? "block py-2 text-blue-600 font-medium hover:text-gray-800 transition-colors cursor-pointer"
      : "block py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer";
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white p-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link href="/" passHref>
            <span className="text-2xl md:text-2xl font-extrabold text-gray-800 hover:text-gray-600 transition-colors cursor-pointer">
              LIQUID 💧
            </span>
          </Link>
        </div>

        {/* Navigation links for Desktop */}
        <div className="flex items-center space-x-5">
          <div className="hidden md:flex items-center space-x-5">
            <Link href="/listings" passHref>
              <span
                className={linkStyles("/listings")}
                onClick={handleLinkClick}
              >
                Listings
              </span>
            </Link>
            {isAdmin && (
              <Link href="/console" passHref>
                <span
                  className={linkStyles("/console")}
                  onClick={handleLinkClick}
                >
                  Console
                </span>
              </Link>
            )}
            <Link href="/dashboard" passHref>
              <span
                className={linkStyles("/dashboard")}
                onClick={handleLinkClick}
              >
                Dashboard
              </span>
            </Link>
          </div>
          <SignInButton />

          {/* Hamburger menu */}
          <div className="md:hidden">
            <button className="text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {/* Place the Hamburger icon here. */}
              &#9776;
            </button>
          </div>
        </div>

        {/* Dropdown menu for mobile */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white z-50 shadow-lg border-t-2 border-blue-600 transition-transform transform duration-300 md:hidden">
            <div className="py-2">
              <Link href="/listings" passHref>
                <span
                  className={`${linkStyles("/listings")} block px-5 py-3`}
                  onClick={handleLinkClick}
                >
                  Listings
                </span>
              </Link>
              {isAdmin && (
                <Link href="/console" passHref>
                  <span
                    className={`${linkStyles("/console")} block px-5 py-3`}
                    onClick={handleLinkClick}
                  >
                    Console
                  </span>
                </Link>
              )}
              <Link href="/dashboard" passHref>
                <span
                  className={`${linkStyles("/dashboard")} block px-5 py-3`}
                  onClick={handleLinkClick}
                >
                  Dashboard
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

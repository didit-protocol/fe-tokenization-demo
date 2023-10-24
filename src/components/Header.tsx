// src/components/Header.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SignInButton from "./SignInButton";

const Header = () => {
  const isAdmin = true;

  return (
    <header className="bg-white p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="LIQUID Logo" width={40} height={40} />
          <Link href="/" passHref>
            <span className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition-colors cursor-pointer">
              LIQUID
            </span>
          </Link>
        </div>
        <nav className="flex items-center space-x-5">
          <Link href="/listings" passHref>
            <span className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
              Listings
            </span>
          </Link>
          {isAdmin && (
            <Link href="/admin-console" passHref>
              <span className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                Console
              </span>
            </Link>
          )}
          <Link href="/dashboard" passHref>
            <span className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
              Dashboard
            </span>
          </Link>
          <SignInButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;

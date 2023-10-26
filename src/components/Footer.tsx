import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className=" text-blue-600 w-full py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl text-black font-semibold mb-4 flex items-center">
            <Image
              src="/logo.png"
              alt="LIQUID Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            Liquid 
          </h3>
          <p className="mb-4 text-black">© 2023 Liquid</p>
          <div className="flex space-x-4 mt-2">
            <Link href="/#" className="text-gray-400 hover:text-blue-300">
              <FaFacebookF />
            </Link>
            <Link href="/#" className="text-gray-400 hover:text-blue-300">
              <FaTwitter />
            </Link>
            <Link href="/#" className="text-gray-400 hover:text-blue-300">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <h3 className="text-xl font-bold mb-4 text-blue-900">Enlaces rápidos</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/#" className="hover:text-blue-800">Home</Link>
            </li>
            <li>
              <Link href="/#" className="hover:text-blue-800">Services</Link>
            </li>
            <li>
              <Link href="/#" className="hover:text-blue-800">Contact us</Link>
            </li>
            <li>
              <Link href="/#" className="hover:text-blue-800">About us</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:block">
          <h3 className="text-xl font-bold mb-4 text-blue-900">Enlaces rápidos</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/#" className="hover:text-blue-800">Home</Link>
            </li>
            <li>
              <Link href="/#" className="hover:text-blue-800">Services</Link>
            </li>
            <li>
              <Link href="/#" className="hover:text-blue-800">Contact us</Link>
            </li>
            <li>
              <Link href="/#" className="hover:text-blue-800">About us</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:block">
          <h3 className="text-xl font-bold mb-4 text-blue-900">Enlaces rápidos</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/#" className="hover:text-blue-800">Home</Link>
            </li>
            <li>
              <Link href="/#" className="hover:text-blue-800">Services</Link>
            </li>
            <li>
              <Link href="/#" className="hover:text-blue-800">Contact us</Link>
            </li>
            <li>
              <Link href="/#" className="hover:text-blue-800">About us</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

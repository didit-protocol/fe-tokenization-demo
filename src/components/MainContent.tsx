import React from "react";
import Image from "next/image";
import TypingEffect from "../components/TypingEffect";
import Link from "next/link";

const MainContent = () => {
  return (
    <div className="flex flex-col justify-center w-full md:w-3/5 px-4 md:px-12 py-6 md:py-12 relative">
      <div className="mb-8 md:mb-12 p-4 bg-white bg-opacity-40 rounded-lg">
        <h1 className="text-4xl md:text-4xl font-extrabold tracking-tighter mb-4 text-gradient bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text">
          LIQUID💧
        </h1>
        <p className="text-lg md:text-xl font-medium mt-4">
          <TypingEffect text="A platform enabling users to buy and sell tokenized securities." />
        </p>
      </div>
      <div className="mt-6 md:mt-0 flex justify-center items-center">
        <Image
          src="/hero.png"
          alt="Imagen descriptiva"
          content="Liquid Company offers a platform enabling users to buy and sell tokenized securities. Dive into the world of tokenization with us!"
          width={350}
          height={350}
          layout="intrinsic"
        />
      </div>
      <Link href="/listings" passHref>
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none shadow-md hover:shadow-lg active:shadow-none text-white font-bold py-2 px-4 rounded-lg mt-10 w-2/3 mx-auto block transition-transform duration-200 ease-in-out transform hover:scale-105 text-shadow-md">
          Get Started <span className="align-middle ml-2">💦</span>
        </button>
      </Link>
    </div>
  );
};

export default MainContent;

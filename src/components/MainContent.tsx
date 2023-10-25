import React from "react";
import Image from "next/image";
import TypingEffect from "../components/TypingEffect";

const MainContent = () => {
    return (
        <div className="flex flex-col justify-center w-full md:w-3/5 px-4 md:px-12 py-6 md:py-12 relative">
            <div className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent flex flex-col items-center z-10 p-4 bg-white bg-opacity-40 rounded-lg mb-6 md:mb-0">
                <h1 className="ml-16 text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 md:mb-0 md:ml-2">
                    Liquid💧Company
                </h1>
                <p className="text-xl md:text-1xl font-bold mt-4 md:ml-10">
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
                <button className="md:mt-10 text-xl md:text-2xl text-white bg-blue-700 hover:bg-blue-800 py-2 md:py-4 px-6 md:px-8 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                    Get Started💦
                </button>
        </div>
    );
}

export default MainContent;

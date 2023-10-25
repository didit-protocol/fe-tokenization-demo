import React from "react";
import Image from "next/image";

const Features = () => {
  return (
    <div className="text-blue-900 w-full py-4 sm:py-8">
      <div className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-6 sm:mb-11">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {renderFeature(
            "/image-features1.png",
            "Asset Liquidity",
            "Have you ever thought about...",
            " How hard it can be to quickly sell things like houses or artwork? This is because they areconsidered illiquid assets, meaning they cant be easily converted to cash. Now, imagine if we could split that house or artwork into smaller shares or pieces that people could buy or sell, just like stocks. That is the idea behind tokenization. By turning these assets into digital tokens , we can trade them easily online, making them more accessible for everyone to buy or sell ."
          )}
          {renderFeature(
            "/image-features5.png",
            "Fractional Ownership",
            "Imagine splitting something big...",
            "Like a painting, into smaller pieces and then selling each piece to different people. That is what tokenization does. It lets more people own a small piece of something expensive. This way, even if you dont have a lot of money, you can still invest in things that were once only for very rich people. It is like everyone chipping in to buy something together. Plus, owning a piece of many different things can be safer than putting all your money into just one thing."
          )}
          {renderFeature(
            "/image-features4.png",
            "Security and Immutability",
            "Imagine a special kind of notebook...",
            "That, once you write something in it, you cant erase or change it, and everyone can see what is written. That is how blockchain works. It safely keeps records of everything that happens. This makes it hard for people to cheat or lie because everyone can see the notebook. Plus, it is easier to check if something correct. This gives people confidence when they are trading or buying things using this system"
          )}
        </div>
      </div>
    </div>
  );
};

const renderFeature = (
  src: string,
  title: string,
  description: string,
  extraDescription?: string
) => (
  <div className="flex flex-col items-center">
    <Image
      src={src}
      alt={title}
      width={250}
      height={250}
      className="rounded-full shadow-lg border-2 border-blue-700 sm:w-full sm:mx-auto"
    />
    <h3 className="text-xl sm:text-2xl mb-3 mt-4">{title}</h3>
    <p className="text-lg sm:text-xl mt-2">{description}</p>
    {extraDescription && (
      <p className="hidden md:block mt-2 text-lg">{extraDescription}</p>
    )}
  </div>
);

export default Features;

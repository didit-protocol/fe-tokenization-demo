import React from "react";
import Image from "next/image";

const Features = () => {
  return (
    <div className="bg-gray-50 text-blue-900 w-full py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8 sm:mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {renderFeature(
            "/image-features1.png",
            "Asset Liquidity",
            "Struggling to sell valuable items?",
            "Tokenization lets you turn assets like art or real estate into digital tokens. Now, selling them becomes as easy as trading online stocks. Unlock quicker, simpler sales."
          )}
          {renderFeature(
            "/image-features5.png",
            "Fractional Ownership",
            "Wish to own a part of something costly?",
            "Tokenization divides valuable items into affordable pieces. Buy a share of an artwork or property. It's like many people buying one item together."
          )}
          {renderFeature(
            "/image-features4.png",
            "Security and Immutability",
            "Need trustworthy transactions?",
            "Blockchain ensures unchangeable, transparent records. It's a system where everyone can verify details, making trading more secure."
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
  <div className="flex flex-col items-center border-2 border-blue-200 rounded-lg p-6 shadow-lg">
    <Image
      src={src}
      alt={title}
      width={250}
      height={250}
      className="rounded-full shadow-lg border-2 border-blue-700 mb-4"
    />
    <h3 className="text-2xl mb-3 text-black">{title}</h3>
    <p className="text-lg mt-2 text-black">{description}</p>
    {extraDescription && <p className="mt-4 text-md">{extraDescription}</p>}
  </div>
);

export default Features;

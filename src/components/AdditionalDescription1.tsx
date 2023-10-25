import React from "react";
import Image from "next/image";
import CalltoActionButton from "./CalltoActionButton";

const AdditionalDescription1 = () => {
  return (
    <div className="bg-gray-50 text-blue-900 w-full">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col lg:flex-row justify-between items-center">
        <div className="lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
          <Image
            src="/gotas3.png"
            alt="Imagen descriptiva"
            width={500}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="lg:w-1/2">
          <div className="p-6 transition-transform">
            <h2 className="text-3xl font-extrabold text-blue-900 mb-4">
              Why Choose Our Tokenization Solutions?
            </h2>
            <ul className="text-lg text-blue-900 space-y-4">
              <li>
                Industry-leading security protocols ensure your assets are safe.
              </li>
              <li>
                User-friendly platform makes it easy to manage your tokens.
              </li>
              <li>
                Our experienced team provides exceptional support for your
                business needs.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDescription1;

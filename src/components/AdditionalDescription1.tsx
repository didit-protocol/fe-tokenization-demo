import React from "react";
import Image from "next/image";
import CalltoActionButton from "./CalltoActionButton";

const AdditionalDescription1 = () => {
    return (
        <div className=" text-blue-900 w-full">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:w-1/2 flex justify-start items-center">
            <Image
              src="/gotas3.png"
              alt="Imagen descriptiva"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
          <div className="lg:w-1/2">
            <div className="bg-gray-100 bg-opacity-50 rounded-lg shadow-lg p-10">
              <h2 className="text-2xl font-extrabold text-blue-900">
                Why Choose Our Tokenization Solutions?
              </h2>
              <ul className="mt-6 text-xl text-blue-900 p-7">
                <li>
                  Industry-leading security protocols ensure your assets are
                  safe.
                </li>
                <li className="mb-3 mt-3">
                  User-friendly platform makes it easy to manage your tokens.
                </li>
                <li>
                  Our experienced team provides exceptional support for your
                  business needs.
                </li>
              </ul>
              <div className="flex justify-center">
                <CalltoActionButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default AdditionalDescription1;

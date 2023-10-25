import React from "react";
import Image from "next/image";

const ClientReview = () => {
  return (
    <div className="w-full py-12">
      <div className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-10">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/avatar1.png"
              alt="Sofia"
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <blockquote>
              <p className="text-xl italic mb-4">
                This is the best solution we have ever used
              </p>
              <cite className="font-semibold text-blue-900">- Sofia</cite>
            </blockquote>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/avatar2.png"
              alt="Alejandro"
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <blockquote>
              <p className="text-xl italic mb-4">
                Their support team is amazing
              </p>
              <cite className="font-semibold text-blue-900">- Alejandro</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReview;

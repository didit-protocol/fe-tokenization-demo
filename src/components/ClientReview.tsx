import React from "react";
import Image from "next/image";

const ClientReview = () => {
  return (
    <div className="bg-gray-50 text-blue-900 w-full py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:p-6 lg:p-8 text-center">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-10">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center border-2 border-blue-200 rounded-lg p-6 shadow-lg">
            <Image
              src="/avatar1.png"
              alt="Sofia"
              width={100}
              height={100}
              className="rounded-full mb-4 shadow-sm"
            />
            <blockquote>
              <p className="text-xl italic mb-4">
                {"This is the best solution we have ever used."}
              </p>
              <cite className="font-semibold text-blue-900">- Sofia</cite>
            </blockquote>
          </div>

          <div className="flex flex-col items-center justify-center border-2 border-blue-200 rounded-lg p-6 shadow-lg">
            <Image
              src="/avatar2.png"
              alt="Alejandro"
              width={100}
              height={100}
              className="rounded-full mb-4 shadow-sm"
            />
            <blockquote>
              <p className="text-xl italic mb-4">
                Their support team is amazing. They are always there for us.
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

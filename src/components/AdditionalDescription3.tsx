import React from "react";
import Image from "next/image";
import CalltoActionButton from "./CalltoActionButton";

const AdditionalInformation3 = () => {
  return (
    <div className="bg-gray-50 text-blue-900 w-full py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:p-6 lg:p-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0 md:w-1/2">
          <div className="p-6 md:p-6">
            <h2 className="text-3xl font-extrabold text-blue-900 mb-4">
              Powerful Token Management
            </h2>
            <p className="text-xl text-blue-900 mb-6">
              Liquid provides token operators with an intuitive dashboard.
              Manage daily token operations seamlessly across your entire
              ecosystem.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
          <Image
            src="/dashboard.jpg"
            alt="Dashboard Preview"
            width={300}
            height={300}
            className="rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/4"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation3;

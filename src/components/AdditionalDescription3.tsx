import React from "react";
import Image from "next/image";
import CalltoActionButton from "./CalltoActionButton";

const AdditionalInformation3 = () => {
    return (
        <div className="text-blue-900 w-full">
            <div className="max-w-screen-xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0 md:w-1/2">
                    <div className="bg-gray-100 bg-opacity-50 rounded-lg shadow-lg p-6 md:p-10">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900">
                            Powerful token management
                        </h2>
                        <div className="mt-4 sm:mt-6 text-lg sm:text-xl text-blue-900">
                            <p>
                                Liquid provides token operators with a powerful and
                                easy-to-use operations dashboard to effectively manage daily
                                token operations across your entire token ecosystem.
                            </p>
                        </div>
                        <div className="mt-6 sm:mt-8">
                            <CalltoActionButton />
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center items-center">
                    <Image
                        src="/dashboard.jpg"
                        alt="Imagen descriptiva"
                        width={300} 
                        height={300}
                        className="rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/4" 
                    />
                </div>
            </div>
        </div>
    )
}

export default AdditionalInformation3;

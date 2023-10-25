import React from "react";
import CalltoActionButton from "./CalltoActionButton";
import ContactForm from "./ContactForm";

const Form = () => {
    return (
        <div className="text-blue-900 w-full">
            <div className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col lg:flex-row justify-center lg:justify-between items-center">
                <div className="mb-6 lg:mb-0 lg:w-1/2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900">
                        The Power of Tokenization
                    </h2>
                    <div className="mt-4 text-lg sm:text-xl text-blue-900">
                        <p>
                            Dive into the world of tokenization with our platform. Convert
                            traditional assets into digital tokens and explore new avenues
                            for investment and trade. Safe, simple, and groundbreaking.
                            Learn more by filling out the attached form.
                        </p>
                    </div>
                    <div className="mt-6">
                        <CalltoActionButton />
                    </div>
                </div>
                <div className="mt-6 lg:mt-0 lg:w-1/2 lg:ml-6 p-4 lg:p-6">
                    <div className="border-2 rounded-lg shadow-lg p-4 bg-white">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;

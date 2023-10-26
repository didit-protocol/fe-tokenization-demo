import React from "react";
import CalltoActionButton from "./CalltoActionButton";
import ContactForm from "./ContactForm";

const Form = () => {
  return (
    <div className="bg-gray-50 text-blue-900 w-full">
      <div className="max-w-screen-xl mx-auto p-6 flex flex-col lg:flex-row justify-center lg:justify-between items-center">
        <div className="mb-8 lg:mb-0 lg:w-1/2 p-4 lg:p-6">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-4">
            The Power of Tokenization
          </h2>
          <div className="mt-2 text-lg sm:text-xl text-blue-900">
            <p>
              Dive into the world of tokenization with our platform. Convert
              traditional assets into digital tokens and explore new avenues for
              investment and trade. Safe, simple, and groundbreaking. Learn more
              by filling out the attached form.
            </p>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 lg:ml-8 p-4 lg:p-6">
          <div className="border-2 rounded-lg shadow-xl p-6 bg-white">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

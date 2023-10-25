import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  name,
  value,
  onChange,
  required,
}) => (
  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      htmlFor={id}
    >
      {label}
    </label>
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id={id}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

interface FormData {
  name: string;
  surname: string;
  email: string;
  company: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You would typically send formData to a server here.
    console.log(formData);

    setFormData({
      name: "",
      surname: "",
      email: "",
      company: "",
      message: "",
    });

    setIsSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 p-3">
        ¡Contact us now!
      </h2>
      <div className="flex flex-wrap -mx-3 mb-6 mt-10">
        <InputField
          label="Name*"
          id="name"
          type="text"
          placeholder="Juan Perez"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <InputField
          label="Surname"
          id="surname"
          type="text"
          placeholder="Martinez"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
        />
        <InputField
          label="Email*"
          id="email"
          type="email"
          placeholder="ejemplo@correo.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          label="Company*"
          id="company"
          type="text"
          placeholder="Liquid"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="message"
            placeholder="Write your message..."
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <button
            className="shadow bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
        {isSubmitted && (
          <p className="text-green-500 m-auto">
            Your message has been submitted. Thank you
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;

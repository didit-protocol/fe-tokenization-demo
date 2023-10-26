// ContactForm.js
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({
      name: "",
      surname: "",
      email: "",
      company: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg ">
      <div className="flex flex-wrap  -mx-3 mb-6 mt-10 ">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="name"
            type="text"
            placeholder="Juan Perez"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Surname
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="surname"
            type="text"
            placeholder="Martinez"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Company
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="company"
            type="company"
            placeholder="Liquid"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
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
            className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="message"
            placeholder="Escribe tu mensaje..."
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
      </div>
    </form>
  );
};

export default ContactForm;

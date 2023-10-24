import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import CalltoActionButton from "./components/CalltoActionButton";
import ContactForm from "./components/ContactForm";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 h-screen flex flex-col items-center md:justify-between">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-1 w-full px-4 md:px-12 py-12 md:space-x-12 ml-40">
        <div className="text-white text-center md:text-left w-full md:w-1/2 p-8 mb-4 md:mb-0">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Tokenization Company
          </h1>
          <p className="text-2xl mb-8">
            A platform enabling users to buy and sell tokenized securities.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
          <Image
            src="/maincontent2.png"
            alt="Imagen descriptiva"
            width={700}
            height={700}
            className="rounded-lg"
          />
        </div>
      </div>
      {/* Additional Description Section */}
      <div className="bg-gray-100 text-blue-900 w-full">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-blue-900">
              Why Choose Our Tokenization Solutions?
            </h2>
            <div className="mt-6 text-xl text-blue-900">
              <p>
                - Industry-leading security protocols ensure your assets are
                safe.
              </p>
              <p>
                - User-friendly platform makes it easy to manage your tokens.
              </p>
              <p>
                - Our experienced team provides exceptional support for your
                business needs.
              </p>
            </div>
            {/* Call-to-action button */}
            <div className="mt-8">
              <CalltoActionButton />
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-end items-center">
            <Image
              src="/WhychooseUs.png"
              alt="Imagen descriptiva"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      {/* Sección de formulario de contacto */}
      <div className="bg-blue-100 text-blue-900 w-full">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-blue-900">
              Get in touch
            </h2>
            <div className="mt-6 text-xl text-blue-900">
              <p>
                - Industry-leading security protocols ensure your assets are
                safe.
              </p>
              <p>
                - User-friendly platform makes it easy to manage your tokens.
              </p>
              <p>
                - Our experienced team provides exceptional support for your
                business needs.
              </p>
            </div>
            {/* Call-to-action button */}
            <div className="mt-8">
              <CalltoActionButton />
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-end items-center">
            <ContactForm />
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="bg-white text-blue-900 w-full py-8">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-8">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Image
                src="/image-features1.png"
                alt="Feature 1"
                width={300}
                height={300}
              />
              <h3 className="font-bold mb-4 mt-5">Asset Liquidity</h3>
              <p>
                Traditionally illiquid assets such as real estate or art can be
                tokenized, meaning they are divided into tokens that represent a
                certain ownership stake. These tokens can then be easily bought,
                sold, or traded on secondary markets, potentially on a global
                scale, which makes the asset more accessible and easier to
                liquidate.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/image-features5.png"
                alt="Feature 2"
                width={300}
                height={300}
              />
              <h3 className="font-bold mb-4 mt-5">Fractional Ownership</h3>
              <p>
                Tokenization allows for the division of an asset into smaller
                units or tokens, enabling fractional ownership. This lowers the
                barrier to entry for potential investors, allowing more people
                to participate in investment opportunities that might have been
                previously accessible only to high-net-worth individuals or
                institutional investors. Fractional ownership can also diversify
                an investor portfolio, reducing risk and providing a path to
                markets previously unavailable to them.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/image-features4.png"
                alt="Feature 3"
                width={300}
                height={300}
              />
              <h3 className="font-bold mb-4 mt-5">
                Security and Immutability of Records
              </h3>
              <p>
                The use of blockchain technology in tokenization platforms
                ensures that all transactions and ownership records are securely
                stored in an immutable ledger. This level of security and
                immutability is crucial for building trust between parties in a
                transaction, reducing the risk of fraud, and lowering the
                likelihood of disputes related to ownership or transaction
                history. It also streamlines the verification processes, as
                blockchain records are transparent and easily auditable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Description Section */}
      <div className="bg-gray-100 text-blue-900 w-full">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-blue-900">
              Powerful token management
            </h2>
            <div className="mt-6 text-xl text-blue-900">
              <p>
                Liquid provides token operators with a powerful and easy-to-use
                operations dashboard to effectively manage daily token
                operations across your entire token ecosystem.
              </p>
            </div>
            {/* Call-to-action button */}
            <div className="mt-8">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-end items-center">
            <Image
              src="/dashboard.png"
              alt="Imagen descriptiva"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="w-full py-8 bg-white">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-8">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center">
              <Image src="/avatar1.png" alt="Sofia" width={100} height={100} />
              <blockquote className="ml-4">
                <p>This is the best solution we have ever used</p>
                <cite>- Sofia</cite>
              </blockquote>
            </div>
            <div className="flex items-center">
              <Image
                src="/avatar2.png"
                alt="Alejandro"
                width={100}
                height={100}
              />
              <blockquote className="ml-4">
                <p>Their support team is amazing</p>
                <cite>- Alejandro</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-blue-500 text-white w-full">
        <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8 flex flex-col md:flex-row justify-between">
          {/* Columna de información de la compañía */}
          <div className="mb-4">
            <h3 className="text-xl font-bold">Liquid Company</h3>
            <Image src="/logo.png" alt="LIQUID Logo" width={40} height={40} />

            <p className="mt-2">
              Dirección de la empresa: 123 Calle , Ciudad, País
            </p>
            <p>Email: info@tokenizationcompany.com</p>
            <p>Teléfono: +123-456-7890</p>
          </div>

          {/* Columna de enlaces rápidos */}
          <div className="mb-4">
            <h3 className="text-xl font-bold">Enlaces rápidos</h3>
            <ul className="mt-2">
              <li>
                <Link href="/#" className="hover:text-gray-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#" className="hover:text-gray-300">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/#" className="hover:text-gray-300">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/#" className="hover:text-gray-300">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna de redes sociales */}
          <div>
            <h3 className="text-xl font-bold">Síguenos</h3>
            <div className="flex mt-2 ">
              <Link
                href="/#"
                className="text-gray-400 hover:text-gray-300 mr-5"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="/#"
                className="text-gray-400 hover:text-gray-300 mr-5"
              >
                <FaTwitter />
              </Link>
              <Link href="/#" className="text-gray-400 hover:text-gray-300 mr-5">
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>
        {/* Línea de derechos de autor */}
        <div className="mt-4 text-center bg-blue-800 p-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Liquid Company - All right
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

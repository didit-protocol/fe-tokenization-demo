import React, { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Listing } from "@/utils/listing";
import StatusCard from "./StatusCard";
import BuyModal from "./BuyModal";
import Head from "next/head";
import { truncateAddress } from "@/utils/text";

interface ListingProps {
  listing: Listing;
}

const ListingDetails: React.FC<ListingProps> = ({ listing }) => {
  const [showModal, setShowModal] = useState(false);
  // Convert timestamp to readable date with hours
  const convertTimestampToDate = (timestamp = 0) => {
    const date = new Date(timestamp * 1000); // Assuming the timestamp is in seconds
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Button click handler
  const handleButtonClick = () => {
    if (listing.status === "T") {
      window.open("https://app.uniswap.org/swap", "_blank");
    } else if (listing.status === "S") {
      setShowModal(true); // Open the BuyModal
    }
  };

  return (
    <div className="h-full min-h-screen py-4">
      <Head>
        <title>Liquid - Listing - {listing.name}</title>
        <meta name="description" content="Console page for Liquid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white p-8 rounded-xl shadow-2xl border-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{listing.name}</h1>
          <StatusCard status={listing.status} />
        </div>

        <Image
          src={listing.portrait_image as string}
          alt="Listing Portrait"
          width={280}
          height={280}
          className="rounded-xl mb-6 hover:shadow-md transition-shadow duration-300"
        />
        <p className="text-gray-700 mb-6">{listing.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {listing.images &&
            listing.images.map((imageObj, index) => {
              if ("image" in imageObj) {
                // Here, TypeScript knows imageObj is of type ListingImage
                return (
                  <Image
                    key={index}
                    src={imageObj.image as string}
                    alt="Listing Image"
                    width={140}
                    height={140}
                    className="rounded-lg hover:shadow-md transition-shadow duration-300"
                  />
                );
              }
              return null; // or return a default image or any other component for File type
            })}
        </div>

        <div className="mb-6 border-b-2 border-indigo-300 pb-6">
          <h2 className="font-bold text-xl mb-4">Details:</h2>
          <ReactMarkdown className="prose">{listing.markdown}</ReactMarkdown>
        </div>

        {(listing.status === "S" || listing.status === "T") && (
          <button
            onClick={handleButtonClick}
            className="mb-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-transform duration-300 hover:scale-105"
          >
            {listing.status === "S" ? "Buy" : "Trade"}
          </button>
        )}

        <div className="mb-6">
          <h2 className="font-medium text-lg">Contract Address:</h2>
          <a
            href={`https://explorer.apothem.network/address/${
              "xdc" + listing.contract_address.substring(2)
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {truncateAddress(listing.contract_address)}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-transparent hover:border-indigo-400 transition-all duration-300">
            <h3 className="font-semibold mb-2">Total Tokens:</h3>
            <p className="text-lg">
              {listing.total_tokens.toLocaleString("en-US")}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-transparent hover:border-indigo-400 transition-all duration-300">
            <h3 className="font-semibold mb-2">Initial Sale Tokens:</h3>
            <p className="text-lg">
              {listing.initial_sale_tokens.toLocaleString("en-US")}
            </p>
          </div>
          {listing.status === "S" && (
            <div className="bg-gray-100 p-4 rounded-lg border-2 border-transparent hover:border-indigo-400 transition-all duration-300">
              <h3 className="font-semibold mb-2">End Time Sale:</h3>
              <p className="text-lg">
                {convertTimestampToDate(listing.end_time_sale)}
              </p>
            </div>
          )}
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-transparent hover:border-indigo-400 transition-all duration-300">
            <h3 className="font-semibold mb-2">Price per Token:</h3>
            <p className="text-lg">
              $
              {Number(listing.initial_value_per_token).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-transparent hover:border-indigo-400 transition-all duration-300">
            <h3 className="font-semibold mb-2">Tokens Sold:</h3>
            <p className="text-lg">
              {listing.tokens_sold.toLocaleString("en-US")}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-transparent hover:border-indigo-400 transition-all duration-300">
            <h3 className="font-semibold mb-2">Current Mk Cap:</h3>
            <p className="text-lg">
              $
              {(
                listing.total_tokens * listing.initial_value_per_token
              ).toLocaleString("en-US")}
            </p>
          </div>
        </div>

        <BuyModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          listing={listing}
        />
      </div>
    </div>
  );
};

export default ListingDetails;

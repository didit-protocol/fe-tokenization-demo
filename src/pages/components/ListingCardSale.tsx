// components/ListingCard.tsx
import React, { FC } from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

interface ListingProps {
  listing: Listing;
  showProgress: boolean;
}

const ListingCardSale: FC<ListingProps> = ({ listing, showProgress }) => (
  <div
    key={listing.contract_address}
    className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 relative"
  >
    <span className="absolute top-4 right-4 text-xs font-bold py-1 px-3 rounded-full bg-green-500 text-white z-10">
      {listing.status}
    </span>

    <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
      <Image
        src={listing.portrait_image}
        alt={listing.name}
        layout="fill"
        objectFit="cover"
      />
    </div>

    <h2 className="text-2xl font-bold mb-2 truncate">{listing.name}</h2>
    <p className="text-gray-600 mb-4 line-clamp-3">{listing.description}</p>

    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-gray-700">
        <p>
          End Time Sale:{" "}
          {new Date(listing.end_time_sale * 1000).toLocaleDateString()}{" "}
          {new Date(listing.end_time_sale * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
    {showProgress ? (
      <ProgressBar
        percentage={(listing.tokens_sold / listing.initial_sale_tokens) * 100}
      />
    ) : null}
    <div className="text-sm text-gray-700">
      <p>Price: ${listing.initial_value_per_token}</p>
      <p>Mk Cap: ${listing.initial_value_per_token * listing.total_tokens}</p>
    </div>

    <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
      View Details
    </button>
  </div>
);

export default ListingCardSale;
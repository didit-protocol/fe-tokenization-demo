import React from "react";
import Image from "next/image";
import StatusCard from "@/components/StatusCard";
import { Listing } from "@/utils/listing";

interface ListingCardProps {
  listing: Listing;
  handleButtonClick: (
    action: React.SetStateAction<string>,
    listing: Listing
  ) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  handleButtonClick,
}) => {
  return (
    <div
      key={listing.contract_address}
      className="bg-white p-3 rounded-xl shadow-md flex flex-col md:flex-row items-start md:items-center transition-shadow hover:shadow-lg border-2 border-gray-200 space-y-3 md:space-y-0 md:space-x-4"
    >
      <div className="w-24 h-24 relative mb-3 md:mb-0 md:mr-4">
        <Image
          src={listing.portrait_image}
          alt={listing.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <div className="flex-grow md:pr-4">
        <h2 className="text-lg font-medium truncate">{listing.name}</h2>
        <p className="text-xs text-gray-600 mt-1">{listing.contract_address}</p>
        <StatusCard status={listing.status} />
      </div>

      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        {/* First row of buttons for mobile */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleButtonClick("editListing", listing)}
            className="text-xs bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition-colors w-24"
          >
            Edit
          </button>
          <button
            onClick={() => handleButtonClick("forceTransfer", listing)}
            className="text-xs bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition-colors w-24"
          >
            Transfer
          </button>
        </div>

        {/* Second row of buttons for mobile */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleButtonClick("freeze", listing)}
            className="text-xs bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition-colors w-24"
          >
            Freeze
          </button>
          <button
            onClick={() => handleButtonClick("unfreeze", listing)}
            className="text-xs bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition-colors w-24"
          >
            Unfreeze
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

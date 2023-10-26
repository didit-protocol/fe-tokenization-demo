import React, { useState, useEffect } from "react";
import Image from "next/image";
import StatusCard from "@/components/StatusCard";
import { Listing } from "@/utils/listing";
import { truncateAddress } from "@/utils/text";
import Link from "next/link";
import { getERC20Balance } from "@/services/balances";

interface DetailedListingCardProps {
  listing: Listing;
  handleButtonClick: (
    action: React.SetStateAction<string>,
    listing: Listing
  ) => void;
  isSale?: boolean;
}

const ListingCardDashboard: React.FC<DetailedListingCardProps> = ({
  listing,
  handleButtonClick,
  isSale = false,
}) => {
  const [balance, setBalance] = useState<string>("Loading...");

  useEffect(() => {
    async function fetchBalance() {
      try {
        const tokenBalance = await getERC20Balance(listing.contract_address);
        setBalance(tokenBalance);
      } catch (error) {
        setBalance("Error fetching balance");
      }
    }
    fetchBalance();
  }, [listing.contract_address]);

  // if balance is 0 then return null
  if (balance === "0.0") {
    return null;
  }

  return (
    <div
      key={listing.contract_address}
      className="bg-white p-3 md:p-4 rounded-xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between transition-shadow hover:shadow-lg border-2 border-gray-200 space-y-3 md:space-y-0 md:space-x-4"
    >
      <div className="w-full md:w-24 h-24 relative mb-3 md:mb-0 md:mr-4">
        <Image
          src={listing.portrait_image as string}
          alt={listing.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <div className="flex-grow md:pr-4">
        <h2 className="text-md md:text-lg font-medium truncate">
          {listing.name}
        </h2>
        <p className="text-xs md:text-sm text-gray-600 mt-1 truncate">
          {truncateAddress(listing.contract_address)}
        </p>
        <StatusCard status={listing.status} />

        {/* Balance display, assuming balance is part of the listing object */}
        <div className="mt-2">
          <span className="font-medium text-sm md:text-sm">
            Balance: {balance}{" "}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-2 w-full md:w-auto">
        <Link href={`/listings/${listing.contract_address}`} target="_blank">
          <button className="text-xs bg-blue-300 p-2 rounded-lg hover:bg-blue-400 transition-colors w-full md:w-32 mb-2 md:mb-0">
            View Listing
          </button>
        </Link>

        {!isSale && (
          <div className="flex flex-row space-x-2 md:space-x-2 w-full md:w-auto">
            {/* Actions buttons */}
            <button
              onClick={() => handleButtonClick("receive", listing)}
              className="text-xs bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition-colors w-full md:w-32"
            >
              Receive
            </button>
            <button
              onClick={() => handleButtonClick("send", listing)}
              className="text-xs bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition-colors w-full md:w-32"
            >
              Send
            </button>
            {/* <button
              onClick={() => handleButtonClick("viewTransactions", listing)}
              className="text-xs bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition-colors w-full md:w-40"
            >
              Transactions
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCardDashboard;

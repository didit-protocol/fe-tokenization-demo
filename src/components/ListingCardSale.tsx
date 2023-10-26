import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import StatusCard from "./StatusCard";
import Link from "next/link";
import { getTotalSupply } from "@/services/balances";

interface ListingProps {
  listing: any;
  showProgress: boolean;
}

const ListingCardSale: FC<ListingProps> = ({ listing, showProgress }) => {
  const [totalSupply, setTotalSupply] = useState<number>(0);

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getTotalSupply(listing.contract_address);
      setTotalSupply(Number(supply));
    }
    fetchTotalSupply();
  }, [listing.contract_address]);

  console.log("totalSupply", totalSupply);

  return (
    <div
      key={listing.contract_address}
      className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 relative flex flex-col"
    >
      <StatusCard status={listing.status} absolute={true} />

      <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
        <Image
          src={listing.portrait_image as string}
          alt={listing.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h2 className="text-2xl font-bold mb-2 truncate">{listing.name}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
        {listing.description}
      </p>

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
        <>
          <ProgressBar
            percentage={(totalSupply / listing.initial_sale_tokens) * 100}
          />
          <span className="text-sm text-gray-700">
            {totalSupply.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}{" "}
            /{" "}
            {listing.initial_sale_tokens.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}{" "}
            tokens sold ({" "}
            {((totalSupply / listing.initial_sale_tokens) * 100).toFixed(2)}% )
          </span>
        </>
      ) : null}
      <div className="text-sm text-gray-700">
        <p>
          Price: $
          {Number(listing.initial_value_per_token).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </p>
        <p>
          Mk Cap: $
          {Number(
            listing.initial_value_per_token * listing.total_tokens
          ).toLocaleString("en-US", { minimumFractionDigits: 0 })}
        </p>
      </div>

      <Link href={`/listings/${listing.contract_address}`} target="_blank">
        <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ListingCardSale;

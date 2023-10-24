import React from "react";
import Image from "next/image";
import StatusCard from "@/components/StatusCard";
import { Listing } from "@/utils/listing";

interface ListingCardProps {
  listing: Listing;
}

const ListingCardModal: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div
      key={listing.contract_address}
      className="w-full bg-white p-3 rounded-xl shadow-md flex items-center transition-shadow hover:shadow-lg border-2 border-gray-200"
    >
      <div className="w-24 h-24 relative mr-4">
        <Image
          src={listing.portrait_image}
          alt={listing.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <div className="flex-grow">
        <h2 className="text-lg font-medium truncate">{listing.name}</h2>
        <p className="text-xs text-gray-600">{listing.contract_address}</p>
        <StatusCard status={listing.status} />
      </div>

      <div className="space-x-2"></div>
    </div>
  );
};

export default ListingCardModal;

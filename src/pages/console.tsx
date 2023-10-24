import React, { useState } from "react";
import Image from "next/image";
import StatusCard from "@/components/StatusCard";
import { mockedListings } from "@/utils/mockedData";
import TransferModal from "@/components/TransferModal";
import FreezeUnfreezeModal from "@/components/FreezeUnfreezeModal";
import CreateListingModal from "@/components/CreateListingModal";
import { Listing } from "@/utils/listing";

const Console = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string>("");
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);

  const handleButtonClick = (
    action: React.SetStateAction<string>,
    listing: Listing | null = null
  ) => {
    setCurrentModal(action);
    setCurrentListing(listing);
    setShowModal(true);
  };

  return (
    <div className="p-5 min-h-screen">
      <div className="flex items-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-xl mb-5"
          onClick={() => handleButtonClick("createListing")}
        >
          Create Listing
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-xl mb-5"
          onClick={() => handleButtonClick("editListing")}
        >
          Edit Listing
        </button>
      </div>
      <div className="container mx-auto grid gap-4">
        {mockedListings.map((listing) => (
          <div
            key={listing.contract_address}
            className="bg-white p-3 rounded-xl shadow-md flex items-center transition-shadow hover:shadow-lg border-2 border-gray-200"
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
              <p className="text-xs text-gray-600">
                {listing.contract_address}
              </p>
              <StatusCard status={listing.status} />
            </div>

            <div className="space-x-2">
              <button
                onClick={() =>
                  handleButtonClick("forceTransfer", listing as Listing)
                }
                className="text-xs bg-blue-400 p-2 rounded-full hover:bg-blue-500"
              >
                <Image src="/send.png" width={12} height={12} alt="Send" />
              </button>
              <button
                onClick={() => handleButtonClick("freeze", listing as Listing)}
                className="text-xs bg-red-400 p-2 rounded-full hover:bg-red-500"
              >
                ❄️
              </button>
              <button
                onClick={() =>
                  handleButtonClick("unfreeze", listing as Listing)
                }
                className="text-xs bg-green-400 p-2 rounded-full hover:bg-green-500"
              >
                🍃
              </button>
            </div>
          </div>
        ))}
      </div>

      <TransferModal
        isOpen={showModal && currentModal === "forceTransfer"}
        onClose={() => setShowModal(false)}
        listing={currentListing}
      />

      <FreezeUnfreezeModal
        isOpen={
          showModal &&
          (currentModal === "freeze" || currentModal === "unfreeze")
        }
        onClose={() => setShowModal(false)}
        listing={currentListing}
        action={currentModal} // Either "freeze" or "unfreeze"
      />

      <CreateListingModal
        isOpen={showModal && currentModal === "createListing"}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Console;

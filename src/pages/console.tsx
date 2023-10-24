import React, { useState } from "react";
import { mockedListings } from "@/utils/mockedData";
import TransferModal from "@/components/TransferModal";
import FreezeUnfreezeModal from "@/components/FreezeUnfreezeModal";
import CreateListingModal from "@/components/CreateListingModal";
import EditListingModal from "@/components/EditListingModal";
import ListingCard from "@/components/ListingCardConsole";
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
      </div>
      <div className="container mx-auto grid gap-4">
        {mockedListings.map((listing) => (
          <ListingCard
            key={listing.contract_address}
            listing={listing as Listing}
            handleButtonClick={handleButtonClick}
          />
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

      <EditListingModal
        isOpen={showModal && currentModal === "editListing"}
        onClose={() => setShowModal(false)}
        listing={currentListing}
      />
    </div>
  );
};

export default Console;

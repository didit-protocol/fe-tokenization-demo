import React, { useState, useEffect } from "react";
import { mockedListings } from "@/utils/mockedData";
import TransferModal from "@/components/TransferModal";
import FreezeUnfreezeModal from "@/components/FreezeUnfreezeModal";
import CreateListingModal from "@/components/CreateListingModal";
import EditListingModal from "@/components/EditListingModal";
import ListingCard from "@/components/ListingCardConsole";
import { Listing } from "@/utils/listing";
import { useListings } from "@/contexts/ListingProvider";
import Head from "next/head";

const Console = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string>("");
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);

  const contextValue = useListings();
  const getListings = contextValue?.getListings;

  const fetchData = async () => {
    if (getListings) {
      const fetchedListings = await getListings();
      setListings(fetchedListings);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getListings]);

  const handleButtonClick = (
    action: React.SetStateAction<string>,
    listing: Listing | null = null
  ) => {
    setCurrentModal(action);
    setCurrentListing(listing);
    setShowModal(true);
  };

  return (
    <div className="p-3 md:p-5 min-h-screen">
      <Head>
        <title>Liquid - Console</title>
        <meta name="description" content="Console page for Liquid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
          <div className="text-xl md:text-2xl font-semibold mb-3 md:mb-0">
            Management Console
          </div>
          <span className="text-gray-600 text-sm mb-4">
            Note: You can create and edit listings only with an admin wallet
            address.
          </span>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium md:font-semibold py-2 px-4 rounded-xl shadow"
            onClick={() => handleButtonClick("createListing")}
          >
            + Create Listing
          </button>
        </div>
      </div>
      <div className="container mx-auto grid">
        {listings.map((listing) => (
          <ListingCard
            key={listing.contract_address}
            listing={listing as Listing}
            handleButtonClick={handleButtonClick}
          />
        ))}
      </div>

      {showModal && currentModal === "forceTransfer" && (
        <TransferModal
          isOpen={showModal && currentModal === "forceTransfer"}
          onClose={() => setShowModal(false)}
          listing={currentListing}
        />
      )}

      {showModal &&
        (currentModal === "freeze" || currentModal === "unfreeze") && (
          <FreezeUnfreezeModal
            isOpen={
              showModal &&
              (currentModal === "freeze" || currentModal === "unfreeze")
            }
            onClose={() => setShowModal(false)}
            listing={currentListing}
            action={currentModal} // Either "freeze" or "unfreeze"
          />
        )}

      {showModal && currentModal === "createListing" && (
        <CreateListingModal
          isOpen={showModal && currentModal === "createListing"}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchData();
            setShowModal(false);
          }}
        />
      )}

      {showModal && currentModal === "editListing" && (
        <EditListingModal
          isOpen={showModal && currentModal === "editListing"}
          onClose={() => setShowModal(false)}
          listing={currentListing}
          onSuccess={() => {
            fetchData();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Console;

import React, { useState, useEffect } from "react";
import ListingCardDashboard from "@/components/ListingCardDashboard";
import { mockedListings } from "@/utils/mockedData";
import { Listing } from "@/utils/listing";
import TransferModal from "@/components/TransferModal";
import ReceiveModal from "@/components/ReceiveModal";
import ViewTransactionsModal from "@/components/ViewTransactionsModal";
import SignInButton from "@/components/SignInButton";
import { useDiditStatus } from "didit-sdk";
import { useListings } from "@/contexts/ListingProvider";
import Link from "next/link";
import Head from "next/head";

const Dashboard = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string>("");
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);

  const handleButtonClick = (
    action: React.SetStateAction<string>,
    listing: Listing | null = null // Add a default value of null here
  ) => {
    setCurrentModal(action);
    setCurrentListing(listing);
    setShowModal(true);
  };
  const contextValue = useListings();
  const getListings = contextValue?.getListings;

  useEffect(() => {
    const fetchData = async () => {
      if (getListings) {
        const fetchedListings = await getListings();
        setListings(fetchedListings);
      }
    };

    fetchData();
  }, [getListings]);

  const { status, address } = useDiditStatus();

  const currentSales = listings.filter((listing) => listing.status === "Sale");
  const tradeableTokens = listings.filter(
    (listing) => listing.status === "Tradeable"
  );
  const refundTokens = listings.filter(
    (listing) => listing.status === "Refund"
  );

  if (status !== "authenticated") {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-10 rounded-lg shadow-md">
        <p className="text-lg text-gray-700 mb-4">
          To view and manage your tokens, please sign in:
        </p>
        <SignInButton />
      </div>
    );
  }

  return (
    <div className="p-5 min-h-screen">
      <Head>
        <title>Liquid - Dashboard</title>
        <meta name="description" content="Dashboard page for Liquid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {currentSales.length === 0 && tradeableTokens.length === 0 ? (
        <div className="flex flex-col items-center mt-10 space-y-4">
          <p className="text-xl text-gray-700">Start your token journey!</p>
          <Link
            href="/listings"
            className="bg-blue-600 text-white py-2 px-8 rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Browse Listings!
          </Link>
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={() => handleButtonClick("receive")} // Add this onClick handler
          >
            Receive Assets
          </button>
        </div>
      ) : (
        <>
          {/* Current Sales section */}
          {currentSales.length > 0 && (
            <>
              <div className="container mx-auto grid mb-8">
                <h2 className="text-xl font-medium mb-4">Current Sales</h2>
                {currentSales.map((listing) => (
                  <ListingCardDashboard
                    key={listing.contract_address}
                    listing={listing as Listing}
                    handleButtonClick={handleButtonClick}
                    isSale={true}
                  />
                ))}
              </div>
            </>
          )}

          {/* Tradeable Tokens section */}
          {tradeableTokens.length > 0 && (
            <>
              <div className="container mx-auto grid">
                <h2 className="text-xl font-medium mb-4">Tradeable Tokens</h2>
                {tradeableTokens.map((listing) => (
                  <ListingCardDashboard
                    key={listing.contract_address}
                    listing={listing as Listing}
                    handleButtonClick={handleButtonClick}
                    isSale={false}
                  />
                ))}
              </div>
            </>
          )}

          {/* Refund Tokens section */}
          {refundTokens.length > 0 && (
            <>
              <h2 className="text-xl font-medium mb-4">Refund Tokens</h2>
              <div className="container mx-auto grid">
                {refundTokens.map((listing) => (
                  <ListingCardDashboard
                    key={listing.contract_address}
                    listing={listing as Listing}
                    handleButtonClick={handleButtonClick}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      <TransferModal
        isOpen={showModal && currentModal === "send"}
        onClose={() => setShowModal(false)}
        listing={currentListing}
        fromAddress={address}
      />

      <ReceiveModal
        isOpen={showModal && currentModal === "receive"}
        onClose={() => setShowModal(false)}
        listing={currentListing}
      />

      <ViewTransactionsModal
        isOpen={showModal && currentModal === "viewTransactions"}
        onClose={() => setShowModal(false)}
        listing={currentListing}
      />
    </div>
  );
};

export default Dashboard;

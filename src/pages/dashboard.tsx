import React, { useState } from "react";
import ListingCardDashboard from "@/components/ListingCardDashboard";
import { mockedListings } from "@/utils/mockedData";
import { Listing } from "@/utils/listing";
import TransferModal from "@/components/TransferModal";
import ReceiveModal from "@/components/ReceiveModal";
import ViewTransactionsModal from "@/components/ViewTransactionsModal";
import SignInButton from "@/components/SignInButton";
import { useDiditStatus } from "didit-sdk";
import Link from "next/link";

const Dashboard = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string>("");
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);

  const handleButtonClick = (
    action: React.SetStateAction<string>,
    listing: Listing
  ) => {
    setCurrentModal(action);
    setCurrentListing(listing);
    setShowModal(true);
  };

  const { status, address } = useDiditStatus();

  const currentSales = mockedListings.filter(
    (listing) => listing.status === "Sale"
  );
  const tradeableTokens = mockedListings.filter(
    (listing) => listing.status === "Tradeable"
  );
  const refundTokens = mockedListings.filter(
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
      <h1 className="text-2xl font-bold mb-6">Your Tokens</h1>

      {currentSales.length === 0 && tradeableTokens.length === 0 ? (
        <div className="flex flex-col items-center mt-10 space-y-4">
          <p className="text-xl text-gray-700">Start your token journey!</p>
          <Link
            href="/listings"
            className="bg-green-600 text-white py-2 px-8 rounded hover:bg-green-700 transition duration-300"
          >
            Browse Listings
          </Link>
        </div>
      ) : (
        <>
          {/* Current Sales section */}
          {currentSales.length > 0 && (
            <>
              <h2 className="text-xl font-medium mb-4">Current Sales</h2>
              <div className="container mx-auto grid gap-4 mb-8">
                {currentSales.map((listing) => (
                  <ListingCardDashboard
                    key={listing.contract_address}
                    listing={listing as Listing}
                    handleButtonClick={handleButtonClick}
                  />
                ))}
              </div>
            </>
          )}

          {/* Tradeable Tokens section */}
          {tradeableTokens.length > 0 && (
            <>
              <h2 className="text-xl font-medium mb-4">Tradeable Tokens</h2>
              <div className="container mx-auto grid gap-4">
                {tradeableTokens.map((listing) => (
                  <ListingCardDashboard
                    key={listing.contract_address}
                    listing={listing as Listing}
                    handleButtonClick={handleButtonClick}
                  />
                ))}
              </div>
            </>
          )}

          {/* Refund Tokens section */}
          {refundTokens.length > 0 && (
            <>
              <h2 className="text-xl font-medium mb-4">Refund Tokens</h2>
              <div className="container mx-auto grid gap-4">
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

// pages/listings.tsx

import Head from "next/head";
import { useState, useEffect, FC } from "react";
import ListingCardSale from "../components/ListingCardSale";
import { mockedListings } from "@/utils/mockedData";

interface Listing {
  contract_address: string;
  name: string;
  description: string;
  portrait_image: string;
  markdown: string;
  images: string[];
  total_tokens: number;
  initial_sale_tokens: number;
  initial_value_per_token: number;
  end_time_sale: number;
  tokens_sold: number;
  status: "Sale" | "Tradeable" | "Refund";
}

const Listings: FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    // Mock data fetching (replace with your API call)
    const mockedData = mockedListings;

    setListings(mockedListings as []);
  }, []);

  return (
    <div className="py-6 sm:py-12 min-h-screen">
      <Head>
        <title>Liquid - Listings</title>
        <meta name="description" content="Listings page for Liquid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Active Sale Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {listings.map(
            (listing) =>
              listing.status === "Sale" && (
                <ListingCardSale
                  key={listing.contract_address}
                  listing={listing}
                  showProgress={true}
                />
              )
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-4">Tradeable Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map(
            (listing) =>
              listing.status === "Tradeable" && (
                <ListingCardSale
                  key={listing.contract_address}
                  listing={listing}
                  showProgress={false}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;

// pages/listings.tsx

import Head from "next/head";
import { useState, useEffect, FC } from "react";
import ListingCardSale from "../components/ListingCardSale";
import { Listing } from "@/utils/listing";
import { useListings } from "@/contexts/ListingProvider";

const Listings: FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
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
              listing.status === "S" && (
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
              listing.status === "T" && (
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

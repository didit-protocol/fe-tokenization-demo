import React from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import ListingsDetails from "../../components/ListingsDetails";
import { Listing } from "@/utils/listing";
import { getListing, getListings } from "@/services/listingService";

interface ListingDetailProps {
  listing: Listing;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
  const { isFallback } = useRouter(); // You need to import 'useRouter' from 'next/router'

  if (isFallback) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-4">
        <p className="text-xl font-medium text-gray-700">Loading ...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-4">
        <p className="text-xl font-medium text-gray-700">
          No Listing found for this token address
        </p>
      </div>
    );
  }

  return <ListingsDetails listing={listing} />;
};

// This function gets the paths that should be pre-rendered.
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all listings to generate paths
  const listings = await getListings();
  // Generate paths from fetched listings
  const paths = listings.map((listing) => ({
    params: { contract_address: listing.contract_address },
  }));

  return {
    paths,
    fallback: true,
  };
};

// This function fetches the data for each pre-rendered path.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 1. Fetch all listings
  const allListings = await getListings();

  // 2. Filter to get the specific listing based on contract_address
  const listing = allListings.find(
    (listing) => listing.contract_address === params?.contract_address
  );

  // 3. Return the filtered listing as a prop
  return {
    props: {
      listing,
    },
  };
};

export default ListingDetail;

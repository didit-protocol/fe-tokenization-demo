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
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>No listing found for this address.</div>;
  }

  return <ListingsDetails listing={listing} />;
};

// This function gets the paths that should be pre-rendered.
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all listings to generate paths
  const listings = await getListings(); // Assuming `getListings` is available and fetches all listings

  // Generate paths from fetched listings
  const paths = listings.map((listing) => ({
    params: { contract_address: listing.contract_address },
  }));

  return {
    paths,
    fallback: true, // This allows for on-the-fly rendering for paths not generated at build time
  };
};

// This function fetches the data for each pre-rendered path.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("params", params);
  const contract_address = params?.contract_address;

  console.log("contract_address", contract_address);

  const listing = await getListing(contract_address as string);

  // const listing = mockedListings.find(
  //   (listing) => listing.contract_address === contract_address
  // );

  return {
    props: {
      listing,
    },
  };
};

export default ListingDetail;

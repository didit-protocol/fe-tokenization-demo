import { GetStaticPaths, GetStaticProps } from "next";
import ListingsDetails from "../../components/ListingsDetails";
import { Listing } from "@/utils/listing";
import { mockedListings } from "@/utils/mockedData";

interface ListingDetailProps {
  listing: Listing;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
  if (!listing) return <div>Loading...</div>;

  return <ListingsDetails listing={listing} />;
};

// This function gets the paths that should be pre-rendered.
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mockedListings.map((listing) => ({
    params: { contract_address: listing.contract_address },
  }));

  return {
    paths,
    fallback: false,
  };
};

// This function fetches the data for each pre-rendered path.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const contract_address = params?.contract_address;

  const listing = mockedListings.find(
    (listing) => listing.contract_address === contract_address
  );

  return {
    props: {
      listing,
    },
  };
};

export default ListingDetail;

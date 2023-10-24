// pages/listings.tsx

import Head from "next/head";
import { useState, useEffect, FC } from "react";
import ListingCardSale from "../components/ListingCardSale";

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
    const mockedData: Listing[] = [
      {
        contract_address: "0x1234567890",
        name: "Hytro Performance Gear",
        description:
          "Hytro Performance Gear offers advanced athletic wear that integrates patented Blood Flow Restriction technology, allowing athletes and fitness enthusiasts to enhance their training and recovery. Their innovative approach to sports equipment has positioned them as a frontrunner in the fitness industry, catering to both professional athletes and everyday consumers.",
        portrait_image:
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32236/rshxreo1qtxppfx3yo1s1qiqf17utul/Hytro_-_preReg_New_circle_1_image_72_.jpg?w=370&h=208&rect=2%2C152%2C1187%2C640&fit=crop&s=48042bf1fd16bc7c6c2cae96a7501639",
        markdown: "Hytro's Detailed Information",
        images: [
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
        ],
        total_tokens: 1000,
        initial_sale_tokens: 500,
        initial_value_per_token: 10,
        end_time_sale: 1633065600,
        tokens_sold: 100,
        status: "Sale",
      },
      {
        contract_address: "0x1234567890",
        name: "Hytro Performance Gear",
        description:
          "Hytro Performance Gear offers advanced athletic wear that integrates patented Blood Flow Restriction technology, allowing athletes and fitness enthusiasts to enhance their training and recovery. Their innovative approach to sports equipment has positioned them as a frontrunner in the fitness industry, catering to both professional athletes and everyday consumers.",
        portrait_image:
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32236/rshxreo1qtxppfx3yo1s1qiqf17utul/Hytro_-_preReg_New_circle_1_image_72_.jpg?w=370&h=208&rect=2%2C152%2C1187%2C640&fit=crop&s=48042bf1fd16bc7c6c2cae96a7501639",
        markdown: "Hytro's Detailed Information",
        images: [
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
        ],
        total_tokens: 1000,
        initial_sale_tokens: 500,
        initial_value_per_token: 10,
        end_time_sale: 1633065600,
        tokens_sold: 100,
        status: "Sale",
      },
      {
        contract_address: "0x1234567890",
        name: "Hytro Performance Gear",
        description:
          "Hytro Performance Gear offers advanced athletic wear that integrates patented Blood Flow Restriction technology, allowing athletes and fitness enthusiasts to enhance their training and recovery. Their innovative approach to sports equipment has positioned them as a frontrunner in the fitness industry, catering to both professional athletes and everyday consumers.",
        portrait_image:
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32236/rshxreo1qtxppfx3yo1s1qiqf17utul/Hytro_-_preReg_New_circle_1_image_72_.jpg?w=370&h=208&rect=2%2C152%2C1187%2C640&fit=crop&s=48042bf1fd16bc7c6c2cae96a7501639",
        markdown: "Hytro's Detailed Information",
        images: [
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
        ],
        total_tokens: 1000,
        initial_sale_tokens: 500,
        initial_value_per_token: 10,
        end_time_sale: 1633065600,
        tokens_sold: 100,
        status: "Tradeable",
      },
      {
        contract_address: "0x0987654321",
        name: "EcoWaste Solutions",
        description:
          "EcoWaste Solutions is dedicated to addressing the global issue of food waste by transforming it into sustainable, eco-friendly products. Through innovative processes, they convert discarded food items into high-quality compost and other bioproducts, providing both consumers and businesses with greener alternatives that contribute to a sustainable future.",
        portrait_image:
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
        markdown: "EcoWaste's Detailed Information",
        images: [
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
        ],
        total_tokens: 2000,
        initial_sale_tokens: 500,
        initial_value_per_token: 5,
        end_time_sale: 1633065600,
        tokens_sold: 200,
        status: "Tradeable",
      },
      {
        contract_address: "0x0987654321",
        name: "EcoWaste Solutions",
        description:
          "EcoWaste Solutions is dedicated to addressing the global issue of food waste by transforming it into sustainable, eco-friendly products. Through innovative processes, they convert discarded food items into high-quality compost and other bioproducts, providing both consumers and businesses with greener alternatives that contribute to a sustainable future.",
        portrait_image:
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
        markdown: "EcoWaste's Detailed Information",
        images: [
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
          "https://seedrs.imgix.net/uploads/startup/summary/cover_image/32343/6wusqqv755sx735erykb9o4pu40zxe7/Neverwaste_panels_2.png?w=370&h=208&fit=crop&s=e3e575dcb8594e0cbf844a7ad8c244fc",
        ],
        total_tokens: 2000,
        initial_sale_tokens: 500,
        initial_value_per_token: 5,
        end_time_sale: 1633065600,
        tokens_sold: 200,
        status: "Sale",
      },
    ];

    setListings(mockedData);
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

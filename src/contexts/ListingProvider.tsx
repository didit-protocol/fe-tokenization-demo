import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

import { getListings, getListing } from "@/services/listingService"; // Import from the new service
import { Listing } from "@/utils/listing";

type ListingsContextType = {
  listings: Listing[];
  getListings: () => Promise<Listing[]>; // Note the change here
  getListing: (contractAddress: string) => Promise<Listing | null>; // new function
};

const ListingsContext = createContext<ListingsContextType | undefined>(
  undefined
);

export const useListings = () => {
  return useContext(ListingsContext);
};

interface ListingsProviderProps {
  children: ReactNode;
}

export const ListingsProvider: React.FC<ListingsProviderProps> = ({
  children,
}) => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      //const fetchedListings = await getListings();
      //setListings(fetchedListings);
    };

    fetchData();
  }, []);

  return (
    <ListingsContext.Provider value={{ listings, getListings, getListing }}>
      {children}
    </ListingsContext.Provider>
  );
};

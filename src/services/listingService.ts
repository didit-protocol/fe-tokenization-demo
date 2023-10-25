// listingService.ts
import { Listing } from "../utils/listing";

const TOKENIZATION_BASE_URL = process.env.NEXT_PUBLIC_TOKENIZATION_BASE_URL;

export const getListings = async (): Promise<Listing[]> => {
  try {
    const header = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `${TOKENIZATION_BASE_URL}/platform/listings/`,
      {
        method: "GET",
        headers: header,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return []; // Return an empty array in case of an error
  }
};

export const getListing = async (
  contractAddress: string
): Promise<Listing | null> => {
  try {
    const header = {
      "Content-Type": "application/json",
    };
    const url = `${TOKENIZATION_BASE_URL}/platform/listings/${contractAddress}/`;

    const response = await fetch(url, {
      method: "GET",
      headers: header,
    });

    console.log("response", response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: Listing = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching specific listing:", error);
    return null;
  }
};

export const createListing = async (
  accessToken: string,
  data: Listing,
  files: { portrait: File; images: File[] }
): Promise<any> => {
  const endpoint = `${TOKENIZATION_BASE_URL}/platform/listings/`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const formData = new FormData();

  // Add listing data to formData
  for (const key in data) {
    formData.append(key, (data as any)[key]);
  }

  // Add portrait image
  formData.append("portrait_image", files.portrait);

  // Add other images
  files.images.forEach((image, index) => {
    formData.append(`images`, image, `image_${index}.webp`);
  });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: Listing = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating listing:", error);
    return null;
  }
};

export const editListing = async (
  accessToken: string,
  contractAddress: string,
  data: Listing
): Promise<any> => {
  const endpoint = `${TOKENIZATION_BASE_URL}/platform/listings/${contractAddress}/`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: Listing = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating listing:", error);
    return null;
  }
};

export const deleteListing = async (
  accessToken: string,
  contractAddress: string
): Promise<any> => {
  const endpoint = `${TOKENIZATION_BASE_URL}/platform/listings/${contractAddress}/`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: Listing = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error deleting listing:", error);
    return null;
  }
};

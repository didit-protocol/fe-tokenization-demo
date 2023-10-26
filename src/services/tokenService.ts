// This can be part of your service file, e.g., listingService.ts

const TOKENIZATION_BASE_URL = process.env.NEXT_PUBLIC_TOKENIZATION_BASE_URL;

export const exchangeToken = async (
  diditAccessToken: string
): Promise<string | null> => {
  const endpoint = `${TOKENIZATION_BASE_URL}/platform/token/`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${diditAccessToken}`,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.access_token || null;
  } catch (error) {
    console.error("Error exchanging token:", error);
    return null;
  }
};

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { exchangeToken } from "@/services/tokenService";
import { useDiditStatus, useAuthenticationAdapter } from "didit-sdk";

type TokenContextType = {
  internalToken: string | null;
  getToken: () => Promise<string | null>;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

interface TokenProviderProps {
  children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [internalToken, setInternalToken] = useState<string | null>(null);

  const { status, token } = useDiditStatus();
  const { signOut } = useAuthenticationAdapter();

  const getToken = async (): Promise<string | null> => {
    if (token && status === "authenticated") {
      const newToken = await exchangeToken(token as string);
      if (newToken) {
        return newToken;
      } else {
        signOut();
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const newToken = await getToken();
      if (newToken) {
        setInternalToken(newToken);
      }
    };

    fetchData();
  }, [token, status]);

  return (
    <TokenContext.Provider value={{ internalToken, getToken }}>
      {children}
    </TokenContext.Provider>
  );
};

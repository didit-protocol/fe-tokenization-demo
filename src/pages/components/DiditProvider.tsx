import React from "react";
import { WagmiConfig } from "wagmi";
import {
  lightTheme,
  DiditAuthProvider,
  DiditRainbowkitProvider,
  DiditAuthMethod,
} from "diditsdktest";
import config from "../config/wagmi";

import "diditsdktest/styles.css";

const DiditProvider = ({ children }: { children: React.ReactNode }) => (
  <WagmiConfig config={config.wagmiConfig}>
    <DiditAuthProvider
      authMethods={["google", "wallet"]}
      baseUrl={process.env.API_URL || ""}
      clientId={process.env.CLIENT_ID || ""}
      claims={process.env.CLAIMS}
      scope={process.env.SCOPE || ""}
      onLogin={(_authMethod?: DiditAuthMethod) =>
        console.log("DiditAuthProvider: Logged in Didit with", _authMethod)
      }
      onLogout={() => console.log("DiditAuthProvider: Logged out from Didit")}
      onError={(_error: string) =>
        console.error("DiditAuthProvider: Didit error: ", _error)
      }
    >
      <DiditRainbowkitProvider chains={config.chains} theme={lightTheme()}>
        {children}
      </DiditRainbowkitProvider>
    </DiditAuthProvider>
  </WagmiConfig>
);

export default DiditProvider;

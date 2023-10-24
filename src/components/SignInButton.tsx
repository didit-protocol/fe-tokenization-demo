import React from "react";
import { useAuthenticationAdapter, useConnectModal } from "didit-sdk";
import { ConnectButton } from "didit-sdk";

const SignInButton = () => {
  const { signOut } = useAuthenticationAdapter();
  const { openConnectModal } = useConnectModal();

  return (
    <div className="flex flex-row items-center justify-center">
      <ConnectButton
        label="Connect with Didit"
        accountStatus="address"
        chainStatus="full"
      />
    </div>
  );
};

export default SignInButton;

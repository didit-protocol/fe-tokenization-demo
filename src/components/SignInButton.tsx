import React, { useState } from "react";
import {
  useAuthenticationAdapter,
  useConnectModal,
  useDiditStatus,
} from "didit-sdk";
import Image from "next/image";

const SignInButton = () => {
  const { signOut } = useAuthenticationAdapter();
  const { openConnectModal } = useConnectModal();
  const { status, address } = useDiditStatus();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="relative">
        {status === "authenticated" ? (
          <>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex justify-between items-center w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sm sm:text-base md:text-md text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <Image
                  src="/avatar.png"
                  alt="User Avatar"
                  width="24"
                  height="24"
                  className="rounded-full"
                />
                <span>{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</span>
                <Image
                  src="/arrow-down.png"
                  alt="Arrow Down"
                  width="16"
                  height="16"
                />
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 w-full rounded-md shadow-lg bg-white transition-transform duration-300 transform scale-100">
                <div className="divide-y divide-gray-200">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
                    onClick={() => {
                      // Handle profile view logic here
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
                    onClick={signOut}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            className="w-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sm sm:text-base md:text-md text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300"
            onClick={openConnectModal}
          >
            Connect with Didit
          </button>
        )}
      </div>
    </div>
  );
};

export default SignInButton;

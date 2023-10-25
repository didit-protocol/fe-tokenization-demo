import React, { useState } from "react";
import Link from "next/link";

const CookiePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleAccept = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mt-2 sm:mt-0 w-full sm:w-auto flex items-center">
              <p className="font-medium text-white sm:text-sm">
                🍪 Usamos cookies.
                <br />
                We use cookies to ensure that we give you the best experience on our website.
                <br className="sm:hidden" />
                <Link className="text-red-100" href="/">
                  Read cookies policies
                </Link>
              </p>
            </div>
            <div className="mt-2 w-full sm:w-auto">
              <button
                onClick={handleAccept}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 w-full sm:w-auto"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;

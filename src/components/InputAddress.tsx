import React, { useState, useEffect } from "react";
import { isAddress } from "web3-utils";

interface InputAddressProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  address?: string;
}

const InputAddress: React.FC<InputAddressProps> = ({
  value,
  onChange,
  placeholder,
  address,
}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false); // state to track if input is disabled

  useEffect(() => {
    if (address && isAddress(address)) {
      onChange(address); // set address directly into the input
      setIsValid(true);
      setIsDisabled(true); // disable the input
    }
  }, [address]);

  useEffect(() => {
    if (value === "") {
      setIsValid(null);
    } else {
      setIsValid(isAddress(value));
    }
  }, [value]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        className={`block w-full p-3 rounded-md transition-colors duration-300 ${
          isDisabled
            ? "bg-gray-200 cursor-not-allowed"
            : isValid === false
            ? "border-red-400 bg-red-50"
            : isValid === true
            ? "border-green-400 bg-green-50"
            : "border-gray-300"
        }`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleAddressChange}
        disabled={isDisabled} // use the isDisabled state to disable the input
      />
      <div className="absolute inset-y-0 right-3 flex items-center">
        {isValid === true && (
          <span className="text-green-500">
            <i className="fas fa-check-circle"></i>
          </span>
        )}
        {isValid === false && (
          <span className="text-red-500">
            <i className="fas fa-times-circle"></i>
          </span>
        )}
      </div>
      {isValid === true && (
        <span className="text-green-500 text-xs absolute right-3 bottom-1">
          Valid
        </span>
      )}
      {isValid === false && value !== "" && (
        <span className="text-red-500 text-xs absolute right-3 bottom-1">
          Invalid
        </span>
      )}
    </div>
  );
};

export default InputAddress;

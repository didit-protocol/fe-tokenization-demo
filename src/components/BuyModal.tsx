import React, { useState, useRef } from "react";
import Modal from "./Modal";
import { useDiditStatus } from "didit-sdk";
import ListingCardModal from "./ListingCardModal";
import { TokenToUSD } from "@/utils/text";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { ERC20_ABI, ERC20_ABI_PAYABLE } from "@/services/balances";

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: any;
}

const BuyModal = ({ isOpen, onClose, listing }: ReceiveModalProps) => {
  const { address } = useDiditStatus();
  const [tokensToBuy, setTokensToBuy] = useState(1);

  const maxTokensAvailable = listing.initial_sale_tokens - listing.tokens_sold;
  const hasSaleEnded = new Date().getTime() > listing.end_time_sale * 1000;
  const totalValue = (tokensToBuy * listing.initial_value_per_token).toFixed(2);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokensToBuy(Number(event.target.value));
  };

  const handleBuy = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const signer = provider.getSigner();

      // Choose the appropriate ABI based on tokensToBuy
      const chosenABI = tokensToBuy > 0 ? ERC20_ABI_PAYABLE : ERC20_ABI;

      console.log("chosenABI", chosenABI);
      console.log("totalValue", totalValue);

      const contract = new ethers.Contract(
        listing.contract_address,
        chosenABI,
        signer
      );

      console.log("contract", contract);

      // Convert tokens to buy into the appropriate unit (assuming 18 decimals for the token)
      const amount = ethers.utils
        .parseEther(tokensToBuy.toString())
        .toHexString();

      let tx;

      // If tokensToBuy > 0, send the value with the mint transaction
      if (tokensToBuy > 0) {
        const intTo = parseInt(totalValue).toString();
        console.log("intTo", intTo);
        let valueToSend = ethers.utils
          .parseEther(parseInt(totalValue).toString())
          .toHexString();
        tx = await contract.mint(address, amount, { value: valueToSend });
      } else {
        tx = await contract.mint(address, amount);
      }

      // Here, you might want to update the UI to reflect the purchase or check the updated balance.
      toast.success(
        "Transaction submitted! Check your dashboard for the updated balance once the transaction is confirmed. This might take a few minutes."
      );

      onClose();
    } catch (error) {
      console.error("Error buying tokens:", error);
      toast.error("Error buying tokens");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Buy Asset">
      <div className="flex flex-col space-y-4">
        {listing && (
          <div className="flex items-center justify-between border-b pb-2">
            <ListingCardModal listing={listing} />
          </div>
        )}
        {!hasSaleEnded && (
          <>
            <div className="flex justify-between items-center">
              <p>{listing.initial_value_per_token} TXDC per token.</p>
              <p>
                Total:{" "}
                {Number(totalValue).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                })}{" "}
                TXDC {"($"}
                {Number(TokenToUSD(Number(totalValue))).toLocaleString(
                  "en-US",
                  {
                    maximumFractionDigits: 2,
                  }
                )}
                {")"}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p>
                Available:{" "}
                {Number(maxTokensAvailable).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                })}{" "}
                tokens.
              </p>
              <p>
                Buying:{" "}
                {Number(tokensToBuy).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                })}{" "}
                tokens.
              </p>
            </div>
            <div className="mt-4">
              <input
                type="range"
                min="1"
                //max={maxTokensAvailable.toString()}\
                max={"10"}
                value={tokensToBuy.toString()}
                onChange={handleSliderChange}
                className="slider w-full"
              />
              <input
                className="border p-2 rounded mt-2 w-full"
                type="number"
                value={tokensToBuy}
                onChange={(e) => setTokensToBuy(Number(e.target.value))}
                max={maxTokensAvailable}
              />
            </div>
          </>
        )}
        {!hasSaleEnded ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
            onClick={handleBuy}
          >
            Buy{" "}
            {Number(tokensToBuy).toLocaleString("en-US", {
              minimumFractionDigits: 0,
            })}{" "}
            Token(s) for{" "}
            {Number(totalValue).toLocaleString("en-US", {
              minimumFractionDigits: 0,
            })}
            {"  "}
            TXDC {"($"}
            {Number(TokenToUSD(Number(totalValue))).toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}{" "}
            {")"}
          </button>
        ) : (
          <span className="text-red-500">Sale has ended</span>
        )}
      </div>
    </Modal>
  );
};

export default BuyModal;

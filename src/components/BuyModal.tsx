import React, { useState, useRef } from "react";
import Modal from "./Modal";
import { useDiditStatus } from "didit-sdk";
import ListingCardModal from "./ListingCardModal";
import Toast, { ToastHandles } from "./Toast";

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: any;
}

const BuyModal = ({ isOpen, onClose, listing }: ReceiveModalProps) => {
  const { address } = useDiditStatus();
  const [tokensToBuy, setTokensToBuy] = useState(1);
  const toastRef = useRef<ToastHandles>(null);

  const maxTokensAvailable = listing.initial_sale_tokens - listing.tokens_sold;
  const hasSaleEnded = new Date().getTime() > listing.end_time_sale * 1000;
  const totalValue = (tokensToBuy * listing.initial_value_per_token).toFixed(2);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokensToBuy(Number(event.target.value));
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
              <p>{listing.initial_value_per_token} per token.</p>
              <p>Total: ${totalValue}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Available: {maxTokensAvailable} tokens.</p>
              <p>Buying: {tokensToBuy} tokens.</p>
            </div>
            <div className="mt-4">
              <input
                type="range"
                min="1"
                max={maxTokensAvailable.toString()}
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">
            Buy {tokensToBuy} Token(s) for ${totalValue}
          </button>
        ) : (
          <span className="text-red-500">Sale has ended</span>
        )}
      </div>
      <Toast
        ref={toastRef}
        backgroundColor="bg-green-500"
        textColor="text-white"
      />
    </Modal>
  );
};

export default BuyModal;

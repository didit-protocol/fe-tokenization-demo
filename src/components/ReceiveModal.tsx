// TransferModal.js
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

const ReceiveModal = ({ isOpen, onClose, listing }: ReceiveModalProps) => {
  const { address } = useDiditStatus();

  const toastRef = useRef<ToastHandles>(null);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(address || "");
    toastRef.current?.showToast("Copied to clipboard");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Receive Asset">
      <div className="flex flex-col space-y-4">
        {listing && (
          <div className="flex items-center justify-between border-b pb-2">
            <ListingCardModal listing={listing} />
          </div>
        )}
        <p>Receive Assets by sending this address to the Sender.</p>
        <input
          className="border p-2 rounded bg-gray-200 cursor-not-allowed"
          type="text"
          placeholder="Value"
          value={address}
          readOnly
          disabled
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCopyToClipboard}
        >
          Copy Address
        </button>
      </div>
      <Toast
        ref={toastRef}
        backgroundColor="bg-green-500"
        textColor="text-white"
      />
    </Modal>
  );
};

export default ReceiveModal;

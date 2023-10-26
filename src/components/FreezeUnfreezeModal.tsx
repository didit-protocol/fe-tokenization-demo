// FreezeUnfreezeModal.js
import React, { useState } from "react";
import Modal from "../components/Modal";
import InputAddress from "./InputAddress";
import ListingCardModal from "./ListingCardModal";

interface FreezeUnfreezeModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: any;
  action: string;
}

const FreezeUnfreezeModal = ({
  isOpen,
  onClose,
  listing,
  action,
}: FreezeUnfreezeModalProps) => {
  const [freezeData, setFreezeData] = useState({
    contract_address: listing ? listing.contract_address : "",
    address: "",
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={action === "freeze" ? "Freeze Asset" : "Unfreeze Asset"}
    >
      <div className="p-2 bg-white rounded-md shadow-lg space-y-4 flex flex-col">
        <div className="border-b pb-2">
          <ListingCardModal listing={listing} />
        </div>
        <p className="font-medium text-gray-700 mb-2">
          {action === "freeze"
            ? "Freeze the asset using the details below:"
            : "Unfreeze the asset using the details below:"}
        </p>
        <div className="space-y-1">
          <label className="text-md text-gray-700 font-semibold block mb-1">
            Address:
          </label>
          <InputAddress
            value={freezeData.address}
            onChange={(val) => setFreezeData({ ...freezeData, address: val })}
            placeholder="Enter address"
          />
        </div>
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-3">
          {action === "freeze" ? "Freeze" : "Unfreeze"}
        </button>
      </div>
    </Modal>
  );
};

export default FreezeUnfreezeModal;

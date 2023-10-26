import React, { useState } from "react";
import Modal from "../components/Modal";
import InputAddress from "./InputAddress";
import ListingCardModal from "./ListingCardModal";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: any;
  fromAddress?: string;
}

const TransferModal = ({
  isOpen,
  onClose,
  listing,
  fromAddress,
}: TransferModalProps) => {
  const [transferData, setTransferData] = useState({
    contract_address: listing ? listing.contract_address : "",
    from: "",
    to: "",
    value: "",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer Asset">
      <div className="p-2 bg-white rounded-md shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <ListingCardModal listing={listing} />
        </div>
        <p className="font-medium text-gray-700 mb-2">
          Fill in the details to transfer the asset:
        </p>
        <div className="space-y-1">
          <label className="text-md text-gray-700 font-semibold block mb-1">
            From:
          </label>
          <InputAddress
            value={transferData.from}
            onChange={(val) => setTransferData({ ...transferData, from: val })}
            placeholder="Enter source address"
            address={fromAddress}
          />
        </div>
        <div className="space-y-1">
          <label className="text-md text-gray-700 font-semibold block mb-1">
            To:
          </label>
          <InputAddress
            value={transferData.to}
            onChange={(val) => setTransferData({ ...transferData, to: val })}
            placeholder="Enter destination address"
          />
        </div>
        <div className="space-y-1">
          <label className="text-md text-gray-700 font-semibold block mb-1">
            Value:
          </label>
          <input
            className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            type="text"
            placeholder="Enter transfer value"
            value={transferData.value}
            onChange={(e) =>
              setTransferData({ ...transferData, value: e.target.value })
            }
          />
        </div>
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-3">
          Transfer
        </button>
      </div>
    </Modal>
  );
};

export default TransferModal;

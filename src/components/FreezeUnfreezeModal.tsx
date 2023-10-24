// FreezeUnfreezeModal.js
import React, { useState } from "react";
import Modal from "../components/Modal";
import Image from "next/image";

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
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 relative">
            <Image
              src={listing?.portrait_image}
              alt={listing?.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium">{listing?.name}</h3>
            <p className="text-xs text-gray-600">{listing?.contract_address}</p>
          </div>
        </div>
        <p>
          {action === "freeze"
            ? "Freeze the asset using the details below:"
            : "Unfreeze the asset using the details below:"}
        </p>

        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Address"
          value={freezeData.address}
          onChange={(e) =>
            setFreezeData({ ...freezeData, address: e.target.value })
          }
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {action === "freeze" ? "Freeze" : "Unfreeze"}
        </button>
      </div>
    </Modal>
  );
};

export default FreezeUnfreezeModal;

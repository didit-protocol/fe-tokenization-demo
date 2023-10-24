// TransferModal.js
import React, { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: any;
}

const TransferModal = ({ isOpen, onClose, listing }: TransferModalProps) => {
  const [transferData, setTransferData] = useState({
    contract_address: listing ? listing.contract_address : "",
    from: "",
    to: "",
    value: "",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer Asset">
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
        <p>Fill in the details to transfer the asset:</p>
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="From"
          value={transferData.from}
          onChange={(e) =>
            setTransferData({ ...transferData, from: e.target.value })
          }
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="To"
          value={transferData.to}
          onChange={(e) =>
            setTransferData({ ...transferData, to: e.target.value })
          }
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Value"
          value={transferData.value}
          onChange={(e) =>
            setTransferData({ ...transferData, value: e.target.value })
          }
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Transfer
        </button>
      </div>
    </Modal>
  );
};

export default TransferModal;

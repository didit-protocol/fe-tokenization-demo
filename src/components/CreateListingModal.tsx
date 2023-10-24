import React, { useState } from "react";
import Modal from "../components/Modal";

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateListingModal = ({ isOpen, onClose }: CreateListingModalProps) => {
  const [listingData, setListingData] = useState({
    contract_address: "",
    name: "",
    description: "",
    portrait_image: "",
    markdown: "",
    images: [],
    total_tokens: 0,
    initial_sale_tokens: 0,
    initial_value_per_token: 0,
    end_time_sale: 0,
    tokens_sold: 0,
    status: "Sale",
  });

  const handleInputChange = (field: string, value: string) => {
    setListingData((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Listing">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2">
            <input
              className="border w-full p-2 rounded"
              type="text"
              placeholder="Contract Address"
              value={listingData.contract_address}
              onChange={(e) =>
                handleInputChange("contract_address", e.target.value)
              }
            />
          </div>
          <div className="w-1/2 px-2">
            <input
              className="border w-full p-2 rounded"
              type="text"
              placeholder="Name"
              value={listingData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
        </div>

        <textarea
          className="border p-2 rounded resize-y"
          rows={4}
          placeholder="Description"
          value={listingData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />

        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Portrait Image URL"
          value={listingData.portrait_image}
          onChange={(e) => handleInputChange("portrait_image", e.target.value)}
        />

        <textarea
          className="border p-2 rounded resize-y"
          rows={3}
          placeholder="Markdown"
          value={listingData.markdown}
          onChange={(e) => handleInputChange("markdown", e.target.value)}
        />

        <div>
          <label className="text-gray-600 font-medium">Status:</label>
          <select
            className="border p-2 rounded ml-2"
            value={listingData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <option value="Sale">Sale</option>
            <option value="Tradeable">Tradeable</option>
            <option value="Refund">Refund</option>
          </select>
        </div>

        {/* Add more inputs for remaining fields like images, total_tokens, etc. 
             Remember to handle the array data type for the `images` attribute accordingly. */}

        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Listing
        </button>
      </div>
    </Modal>
  );
};

export default CreateListingModal;

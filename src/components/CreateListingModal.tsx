import React, { useState } from "react";
import Modal from "../components/Modal";
import InputAddress from "./InputAddress";
import Image from "next/image";

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ListingData = {
  contract_address: string;
  name: string;
  description: string;
  portrait_image: File | null; // <-- Change made here
  markdown: string;
  images: File[];
  total_tokens: string;
  initial_sale_tokens: string;
  initial_value_per_token: string;
  end_time_sale: string;
  tokens_sold: string;
  status: string;
};

const CreateListingModal = ({ isOpen, onClose }: CreateListingModalProps) => {
  const [listingData, setListingData] = useState<ListingData>({
    contract_address: "",
    name: "",
    description: "",
    portrait_image: null,
    markdown: "",
    images: [],
    total_tokens: "",
    initial_sale_tokens: "",
    initial_value_per_token: "",
    end_time_sale: "",
    tokens_sold: "",
    status: "Sale",
  });

  const handleInputChange = (field: string, value: string) => {
    setListingData((prevState) => ({ ...prevState, [field]: value }));
  };

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setListingData((prev) => ({
        ...prev,
        portrait_image: files[0],
      }));
    }
  };

  const fileUploadMultiple = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setListingData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          ...Array.from(files).slice(0, 3 - prev.images.length),
        ],
      }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Listing"
      className="w-full max-w-6xl mx-4"
    >
      {" "}
      {/* Increase width */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
          <div className="w-full px-2">
            <label className="block text-gray-600 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              maxLength={50} // Add char limit
              className="border w-full p-2 rounded shadow-sm"
              type="text"
              placeholder="Enter Name (Max 50 chars)"
              value={listingData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            maxLength={200}
            className="border w-full p-3 rounded-lg shadow-sm hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            rows={4}
            placeholder="Describe the project in detail"
            value={listingData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">
            Portrait Image <span className="text-red-500">*</span>
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              fileUpload(e);
            }}
          />

          {listingData.portrait_image && (
            <div className="mt-4 relative w-24 h-24 rounded">
              <Image
                src={URL.createObjectURL(listingData.portrait_image)}
                alt="Uploaded Portrait"
                width={96}
                height={96}
                className="rounded"
              />
              <button
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5"
                onClick={() => {
                  setListingData((prev) => ({ ...prev, portrait_image: null }));
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">
            Upload Images (max 3) <span className="text-red-500">*</span>
          </label>
          {listingData.images.length < 3 && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                fileUploadMultiple(e);
              }}
            />
          )}

          <div className="flex mt-4">
            {listingData.images.map((image, index) => (
              <div key={index} className="relative w-24 h-24 rounded mr-4">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Uploaded Image"
                  width={96}
                  height={96}
                  className="rounded"
                />
                <button
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-fullw-6 h-6 flex items-center justify-center"
                  onClick={() => {
                    const updatedImages = [...listingData.images];
                    updatedImages.splice(index, 1);
                    setListingData((prev) => ({
                      ...prev,
                      images: updatedImages,
                    }));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            Markdown <span className="text-red-500">*</span>
          </label>
          <textarea
            maxLength={500} // Add char limit
            className="border w-full p-2 rounded resize-y shadow-sm"
            rows={3}
            placeholder="Enter Markdown (Max 500 chars)"
            value={listingData.markdown}
            onChange={(e) => handleInputChange("markdown", e.target.value)}
          />
        </div>

        <div className="w-full px-2 mb-4">
          <label className="block text-gray-600 mb-2">
            Contract Address <span className="text-red-500">*</span>
          </label>
          <InputAddress
            value={listingData.contract_address}
            onChange={(val) =>
              setListingData({ ...listingData, contract_address: val })
            }
            placeholder="0x... (Ethereum Contract Address)"
          />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Tokens Input */}
            <div>
              <label className="block text-gray-600 mb-2">Total Tokens</label>
              <input
                className="border w-full p-2 rounded shadow-sm"
                type="text"
                placeholder="Enter Total Tokens"
                value={listingData.total_tokens}
                onChange={(e) =>
                  handleInputChange("total_tokens", e.target.value)
                }
              />
            </div>

            {/* Initial Sale Tokens Input */}
            <div>
              <label className="block text-gray-600 mb-2">
                Initial Sale Tokens
              </label>
              <input
                className="border w-full p-2 rounded shadow-sm"
                type="text"
                placeholder="Enter Initial Sale Tokens"
                value={listingData.initial_sale_tokens}
                onChange={(e) =>
                  handleInputChange("initial_sale_tokens", e.target.value)
                }
              />
            </div>

            {/* Conditional End Time Sale Input */}
            {listingData.status === "Sale" && (
              <div className="col-span-full md:col-span-1">
                <label className="block text-gray-600 mb-2">
                  End Time Sale <span className="text-red-500">*</span>
                </label>
                <input
                  className="border w-full p-2 rounded shadow-sm"
                  type="datetime-local"
                  value={listingData.end_time_sale}
                  onChange={(e) =>
                    handleInputChange("end_time_sale", e.target.value)
                  }
                />
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="mt-4">
            <label className="text-gray-600 font-medium block mb-2">
              Status:
            </label>
            <select
              className="w-full border p-2 rounded shadow-sm"
              value={listingData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              <option value="Sale">Sale</option>
              <option value="Tradeable">Tradeable</option>
              <option value="Refund">Refund</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Create Listing
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateListingModal;

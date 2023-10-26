import React, { useState } from "react";
import Modal from "../components/Modal";
import Image from "next/image";
import { Listing } from "@/utils/listing";
import { toast } from "react-toastify";
import { useToken } from "@/contexts/TokenProvider";
import { editListing, deleteListing } from "@/services/listingService";
import InputAddress from "./InputAddress";

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing | null;
  onSuccess?: () => void;
}

const isFile = (image: string | File): image is File => {
  return (image as File).name !== undefined;
};

const EditListingModal = ({
  isOpen,
  onClose,
  listing,
  onSuccess,
}: CreateListingModalProps) => {
  const { internalToken } = useToken();

  const [listingData, setListingData] = useState<Listing>({
    contract_address: listing?.contract_address || "",
    name: listing?.name || "",
    description: listing?.description || "",
    portrait_image: listing?.portrait_image || null,
    markdown: listing?.markdown || "",
    images: listing?.images || [],
    total_tokens: listing?.total_tokens || 0,
    initial_sale_tokens: listing?.initial_sale_tokens || 0,
    initial_value_per_token: listing?.initial_value_per_token || 0,
    end_time_sale: listing?.end_time_sale || 0,
    tokens_sold: listing?.tokens_sold || 0,
    status: listing?.status || "S",
  });

  const renderImage = (image: string | File) => {
    if (isFile(image)) {
      return URL.createObjectURL(image);
    }
    return image;
  };

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
          ...((prev.images as File[]) || []), // Provide an empty array as fallback
          ...Array.from(files).slice(0, 3 - (prev.images?.length || 0)), // Handle null with a fallback value of 0
        ],
      }));
    }
  };

  const handleEditListing = async () => {
    try {
      const response = await editListing(
        internalToken as string,
        listingData.contract_address,
        listingData
      );

      if (response && response.contract_address) {
        toast.success("Listing edited successfully");
        onSuccess && onSuccess();
      } else {
        toast.error("Editing listing failed");
      }
    } catch (error) {
      toast.error("An error occurred while editing the listing");
    }
  };

  const handleDeleteListing = async () => {
    try {
      const status = await deleteListing(
        internalToken as string,
        listingData.contract_address
      );

      console.log(status);

      if ((status && status === 200) || status === 204) {
        toast.success("Listing deleted successfully");
        onSuccess && onSuccess();
      } else {
        toast.error("Deleting listing failed");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the listing");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Listing"
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
                src={renderImage(listingData.portrait_image)}
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
          {(listingData.images ? listingData.images.length : 0) < 3 && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                fileUploadMultiple(e);
              }}
            />
          )}

          <div className="flex mt-4">
            {listingData.images &&
              listingData.images.map((imageObj, index) => {
                let imageSrc: string;
                if ("image" in imageObj) {
                  imageSrc = renderImage(imageObj.image);
                } else if (imageObj instanceof File) {
                  // If imageObj is of File type, you might want to convert it to a data URL or handle differently
                  // For the sake of this example, I'll use a placeholder.
                  imageSrc = URL.createObjectURL(imageObj);
                } else {
                  return null; // Or handle other unexpected cases
                }

                return (
                  <div key={index} className="relative w-24 h-24 rounded mr-4">
                    <Image
                      src={imageSrc}
                      alt="Uploaded Image"
                      width={96}
                      height={96}
                      className="rounded"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => {
                        const updatedImages = [
                          ...(listingData.images as File[]),
                        ];
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
                );
              })}
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            Markdown <span className="text-red-500">*</span>
          </label>
          <textarea
            maxLength={5000} // Add char limit
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
              <option value="S">Sale</option>
              <option value="T">Tradeable</option>
              <option value="R">Refund</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-between space-x-4">
          {/* Edit Listing Button */}
          <button
            className="flex-grow bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleEditListing}
          >
            <span>Edit Listing</span>
          </button>

          {/* Delete Listing Button */}
          <button
            className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={handleDeleteListing}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditListingModal;

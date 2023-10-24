import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside the content
  const handleClickOutside = (event: { target: any }) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-5 rounded shadow-lg max-w-md w-full relative"
      >
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

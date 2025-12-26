"use client";

import Image from "next/image";

interface WildlifeDetailModalProps {
  selectedWildlife: any;
  closeModal: () => void;
  visible: boolean;
}

export default function WildlifeDetailModal({ selectedWildlife, closeModal, visible }: WildlifeDetailModalProps) {
  if (!selectedWildlife) return null;

  return (
    <div className={`fixed left-4 top-4 z-[2000] transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-lg p-6 max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-black mb-4">{selectedWildlife.title}</h2>
        <div className="mb-4">
          <Image
            src={selectedWildlife.image}
            alt={selectedWildlife.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <p className="text-gray-700 mb-2">{selectedWildlife.description}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Author:</strong> {selectedWildlife.author}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {selectedWildlife.location}</p>
        <p className="text-sm text-gray-600 mb-4"><strong>Date:</strong> {selectedWildlife.date}</p>
        <button
          onClick={closeModal}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
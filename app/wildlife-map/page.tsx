"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamic import to avoid SSR issues with Leaflet
const WorldMap = dynamic(() => import("../components/world-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-200 animate-pulse" />
  ),
});

export default function WildlifeMap() {
  const [searchAnimal, setSearchAnimal] = useState("");
  const [selectedWildlife, setSelectedWildlife] = useState<any>(null);

  const handleMarkerClick = (wildlife: any) => {
    setSelectedWildlife(wildlife);
  };

  const closeModal = () => {
    setSelectedWildlife(null);
  };

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Main Map */}
      <div className="w-full h-full">
        <WorldMap onMarkerClick={handleMarkerClick} />
      </div>

      {/* Fixed Modal at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg p-4 z-[1001]">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-black mb-2">Search for Wildlife</h3>
          <input
            type="text"
            placeholder="Enter animal name..."
            value={searchAnimal}
            onChange={(e) => setSearchAnimal(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>

      {/* Wildlife Detail Modal */}
      {selectedWildlife && (
        <div className="fixed inset-0 flex items-center justify-center z-[2000]" onClick={closeModal}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
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
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
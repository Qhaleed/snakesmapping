"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import BackButton from "../components/back-button";
import SearchModal from "../components/search-modal";
import WildlifeDetailModal from "../components/wildlife-detail-modal";

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
      <BackButton />

      {/* Main Map */}
      <div className="w-full h-full">
        <WorldMap onMarkerClick={handleMarkerClick} showLegend={true} />
      </div>

      {/* Search Modal */}
      <SearchModal searchAnimal={searchAnimal} setSearchAnimal={setSearchAnimal} />

      {/* Wildlife Detail Modal */}
      <WildlifeDetailModal selectedWildlife={selectedWildlife} closeModal={closeModal} />
    </div>
  );
}
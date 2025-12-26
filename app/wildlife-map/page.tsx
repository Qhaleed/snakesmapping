"use client";

import { useState, useRef } from "react";
import BackButton from "../components/back-button";
import SearchModal from "../components/search-modal";
import WildlifeDetailModal from "../components/wildlife-detail-modal";
import WorldMap from "../components/world-map";

export default function WildlifeMap() {
  const [searchAnimal, setSearchAnimal] = useState("");
  const [selectedWildlife, setSelectedWildlife] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const worldMapRef = useRef<{ handleZoomOut: () => void } | null>(null);

  const handleMarkerClick = (wildlife: any) => {
    setSelectedWildlife(wildlife);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    worldMapRef.current?.handleZoomOut();
    setTimeout(() => setSelectedWildlife(null), 1000); // allow fade out
  };

  return (
    <div className="relative w-full h-screen bg-white">
      <BackButton />

      {/* Main Map */}
      <div className="w-full h-full">
        <WorldMap ref={worldMapRef} onMarkerClick={handleMarkerClick} showLegend={true} />
      </div>

      {/* Search Modal */}
      <SearchModal searchAnimal={searchAnimal} setSearchAnimal={setSearchAnimal} />

      {/* Wildlife Detail Modal */}
      <WildlifeDetailModal selectedWildlife={selectedWildlife} closeModal={closeModal} visible={modalVisible} />
    </div>
  );
}
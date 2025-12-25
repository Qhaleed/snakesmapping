"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Red marker icon
const icon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


// Wildlife sighting locations (international)
const wildlifeLocations = [
  {
    // Serengeti - African Elephant
    position: [-2.333333, 34.833333] as [number, number],
    title: "African Elephant",
    location: "Serengeti, Tanzania",
    author: "David Okoye",
    description: "A herd of elephants seen migrating across the Serengeti.",
    date: "Nov 20, 2025",
    image: "/animal-images/african-elephant.png",
  },
  {
    // Alaska - Bald Eagle
    position: [64.200841, -149.493673] as [number, number],
    title: "Bald Eagle",
    location: "Alaska, USA",
    author: "Emily Johnson",
    description: "Bald eagle spotted soaring over the forests of Alaska.",
    date: "Oct 12, 2025",
    image: "/animal-images/bald-eagle.png",
  },
  {
    // Sichuan - Giant Panda
    position: [30.666667, 104.066667] as [number, number],
    title: "Giant Panda",
    location: "Sichuan, China",
    author: "Li Wei",
    description: "Giant panda observed eating bamboo in Sichuan.",
    date: "Sep 5, 2025",
    image: "/animal-images/giant-panda.png",
  },
  {
    // Northern Territory - Red Kangaroo
    position: [-20.000000, 133.000000] as [number, number],
    title: "Red Kangaroo",
    location: "Northern Territory, Australia",
    author: "Sophie Brown",
    description: "Red kangaroo hopping across the outback.",
    date: "Aug 18, 2025",
    image: "/animal-images/red-kangaroo.png",
  },
];

export default function WorldMap({ onMarkerClick }: { onMarkerClick?: (wildlife: any) => void }) {
  return (
    <div className="relative w-full h-full">

      <MapContainer
        center={[20, 0]}
        zoom={3}
        minZoom={3}        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}        className="w-full h-full rounded-2xl"
        style={{ minHeight: "100%" }}
      >
        {/* CartoDB Voyager - Clean modern style */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {wildlifeLocations.map((wildlife, index) => (
          <Marker
            key={index}
            position={wildlife.position}
            icon={icon}
            eventHandlers={{
              click: () => onMarkerClick?.(wildlife),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

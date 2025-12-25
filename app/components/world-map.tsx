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
  },
  {
    // Alaska - Bald Eagle
    position: [64.200841, -149.493673] as [number, number],
    title: "Bald Eagle",
    location: "Alaska, USA",
  },
  {
    // Sichuan - Giant Panda
    position: [30.666667, 104.066667] as [number, number],
    title: "Giant Panda",
    location: "Sichuan, China",
  },
  {
    // Northern Territory - Red Kangaroo
    position: [-20.000000, 133.000000] as [number, number],
    title: "Red Kangaroo",
    location: "Northern Territory, Australia",
  },
];

export default function WorldMap() {
  return (
    <div className="relative w-full h-full">
      {/* Filter Tab */}
      <div className="absolute top-4 right-4 z-1000 bg-white rounded-lg shadow-md px-4 py-2">
        <span className="text-sm  text-black">Wildlife Sightings (Global)</span>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full rounded-2xl"
        style={{ minHeight: "100%" }}
      >
        {/* CartoDB Voyager - Clean modern style */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {wildlifeLocations.map((wildlife, index) => (
          <Marker key={index} position={wildlife.position} icon={icon}>
            <Popup>
              <strong>{wildlife.title}</strong>
              <br />
              {wildlife.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

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

// Snake sighting locations
const snakeLocations = [
  {
    position: [15.5, 120.9] as [number, number],
    title: "Philippine Rat Snake",
    location: "Nueva Ecija",
  },
  {
    position: [9.8, 118.7] as [number, number],
    title: "King Cobra",
    location: "Palawan",
  },
  {
    position: [7.1, 125.6] as [number, number],
    title: "Reticulated Python",
    location: "Davao",
  },
  {
    position: [16.4, 120.6] as [number, number],
    title: "Philippine Pit Viper",
    location: "Baguio",
  },
];

export default function PhilippinesMap() {
  return (
    <div className="relative w-full h-full">
      {/* Filter Tab */}
      <div className="absolute top-4 right-4 z-1000 bg-white rounded-lg shadow-md px-4 py-2">
        <span className="text-sm  text-black">Philippine King Cobra</span>
      </div>

      <MapContainer
        center={[12.8797, 121.774]}
        zoom={6}
        className="w-full h-full rounded-2xl"
        style={{ minHeight: "100%" }}
      >
        {/* CartoDB Voyager - Clean modern style */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {snakeLocations.map((snake, index) => (
          <Marker key={index} position={snake.position} icon={icon}>
            <Popup>
              <strong>{snake.title}</strong>
              <br />
              {snake.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

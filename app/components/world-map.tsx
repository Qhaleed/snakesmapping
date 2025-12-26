"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Color map based on taxonomy
const colorMap: Record<string, { color: string; fillColor: string }> = {
  mammal: { color: "orange", fillColor: "orange" },
  bird: { color: "blue", fillColor: "blue" },
  reptile: { color: "red", fillColor: "red" },
  amphibian: { color: "green", fillColor: "green" },
  pisces: { color: "purple", fillColor: "purple" },
  insecta: { color: "yellow", fillColor: "yellow" },
  arachnida: { color: "pink", fillColor: "pink" },
  crustacea: { color: "cyan", fillColor: "cyan" },
};

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
    taxo: "mammal",
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
    taxo: "bird",
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
    taxo: "mammal",
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
    taxo: "mammal",
  },
  {
    // Amazon - King Cobra
    position: [-3.4653, -62.2159] as [number, number],
    title: "King Cobra",
    location: "Amazon Rainforest, Brazil",
    author: "Carlos Silva",
    description: "King cobra sighted in the dense Amazon rainforest.",
    date: "Jul 10, 2025",
    image: "/animal-images/king-cobra.png",
    taxo: "reptile",
  },
  {
    // Australia - Saltwater Crocodile
    position: [-12.4634, 130.8456] as [number, number],
    title: "Saltwater Crocodile",
    location: "Northern Territory, Australia",
    author: "Jack Thompson",
    description: "Large saltwater crocodile spotted in the rivers of northern Australia.",
    date: "Jun 15, 2025",
    image: "/animal-images/saltwater-crocodile.png",
    taxo: "reptile",
  },
  {
    // Amazon - Scarlet Macaw
    position: [-3.1190, -60.0217] as [number, number],
    title: "Scarlet Macaw",
    location: "Amazon Rainforest, Brazil",
    author: "Maria Gonzalez",
    description: "Vibrant scarlet macaw observed in the canopy of the Amazon.",
    date: "May 22, 2025",
    image: "/animal-images/scarlet-macaw.png",
    taxo: "bird",
  },
  {
    // Ecuador - Poison Dart Frog
    position: [-0.1807, -78.4678] as [number, number],
    title: "Poison Dart Frog",
    location: "Amazon Rainforest, Ecuador",
    author: "Luis Ramirez",
    description: "Colorful poison dart frog found in the Ecuadorian rainforest.",
    date: "Apr 8, 2025",
    image: "/animal-images/poison-dart-frog.png",
    taxo: "amphibian",
  },
  {
    // Kenya - Cheetah
    position: [-1.2921, 36.8219] as [number, number],
    title: "Cheetah",
    location: "Masai Mara, Kenya",
    author: "Anna Wanjiku",
    description: "Cheetah hunting on the plains of the Masai Mara.",
    date: "Mar 14, 2025",
    image: "/animal-images/cheetah.png",
    taxo: "mammal",
  },
  {
    // Pacific Ocean - Great White Shark
    position: [-33.7, -118.2] as [number, number],
    title: "Great White Shark",
    location: "Pacific Ocean, USA",
    author: "Mike Ocean",
    description: "Great white shark spotted off the coast of California.",
    date: "Feb 20, 2025",
    image: "/animal-images/great-white-shark.png",
    taxo: "pisces",
  },
  {
    // North America - Monarch Butterfly
    position: [40, -100] as [number, number],
    title: "Monarch Butterfly",
    location: "Great Plains, USA",
    author: "Sarah Fields",
    description: "Monarch butterfly migrating across the plains.",
    date: "Jan 10, 2025",
    image: "/animal-images/monarch-butterfly.png",
    taxo: "insecta",
  },
  {
    // California - Black Widow Spider
    position: [34, -118] as [number, number],
    title: "Black Widow Spider",
    location: "Los Angeles, USA",
    author: "Tom Weaver",
    description: "Black widow spider found in urban area.",
    date: "Dec 5, 2024",
    image: "/animal-images/black-widow-spider.png",
    taxo: "arachnida",
  },
  {
    // Chesapeake Bay - Blue Crab
    position: [37, -76] as [number, number],
    title: "Blue Crab",
    location: "Chesapeake Bay, USA",
    author: "River Smith",
    description: "Blue crab caught in the Chesapeake Bay.",
    date: "Nov 15, 2024",
    image: "/animal-images/blue-crab.png",
    taxo: "crustacea",
  },
];

function Markers({ onMarkerClick, setPrevZoom, setPrevCenter }: { onMarkerClick?: (wildlife: any) => void; setPrevZoom: (zoom: number) => void; setPrevCenter: (center: L.LatLng) => void }) {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(3);

  useEffect(() => {
    const onZoom = () => setZoomLevel(map.getZoom());
    map.on('zoom', onZoom);
    map.on('zoomend', onZoom);
    return () => {
      map.off('zoom', onZoom);
      map.off('zoomend', onZoom);
    };
  }, [map]);

  return (
    <>
      {wildlifeLocations.map((wildlife, index) => {
        const colors = colorMap[wildlife.taxo] || { color: "gray", fillColor: "gray" };
        const radius = 8 * Math.pow(0.9, zoomLevel - 3);
        return (
          <CircleMarker
            key={index}
            center={wildlife.position}
            radius={radius}
            color={colors.color}
            fillColor={colors.fillColor}
            fillOpacity={0.8}
            eventHandlers={{
              click: () => {
                setPrevZoom(map.getZoom());
                setPrevCenter(map.getCenter());
                map.flyTo(wildlife.position, 8);
                setTimeout(() => onMarkerClick?.(wildlife), 1000);
              },
            }}
          />
        );
      })}
    </>
  );
}

function MapRefSetter({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);
  return null;
}

const WorldMap = forwardRef<{ handleZoomOut: () => void }, { onMarkerClick?: (wildlife: any) => void; showLegend?: boolean }>(({ onMarkerClick, showLegend }, ref) => {
  const mapRef = useRef<L.Map | null>(null);
  const [prevZoom, setPrevZoom] = useState<number | null>(null);
  const [prevCenter, setPrevCenter] = useState<L.LatLng | null>(null);

  const handleZoomOut = () => {
    if (mapRef.current && prevZoom !== null && prevCenter) {
      mapRef.current.flyTo(prevCenter, prevZoom);
    }
  };

  useImperativeHandle(ref, () => ({
    handleZoomOut,
  }));

  return (
    <div className="relative w-full h-full">

      <MapContainer
        center={[20, 0]}
        zoom={3}
         minZoom={3}      maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        className="w-full h-full rounded-2xl"
        style={{ minHeight: "100%" }}
      >
        {/* CartoDB Positron (Light) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <MapRefSetter mapRef={mapRef} />
        <Markers onMarkerClick={onMarkerClick} setPrevZoom={setPrevZoom} setPrevCenter={setPrevCenter} />
      </MapContainer>

      {showLegend && (
        <div className="fixed right-4 top-1/3  transform -translate-y-1/2 bg-white/10 p-4 rounded-lg shadow-lg z-[1000] backdrop-blur-xl border-black bg-red-900 border-white/20 h-96 w-fit overflow-y-auto text-xl">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to bottom, rgba(0,0,0), transparent)] rounded-lg border-black" />
          <h3 className="font-bold mb-2 text-black drop-shadow-sm relative z-10">Legend</h3>
          <div className="space-y-1 text-lg  relative z-10">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span className="text-black">Reptilia</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-black">Mammalia</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-black">Aves</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="text-black">Amphibia</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-black">Pisces</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-black">Insecta</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-pink-500 rounded-full mr-2"></div>
              <span className="text-black">Arachnida</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-cyan-500 rounded-full mr-2"></div>
              <span className="text-black">Crustacea</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default WorldMap;


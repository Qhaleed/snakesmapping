"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

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
  {
    // Philippines - Philippine Eagle
    position: [13.5, 121.0] as [number, number],
    title: "Philippine Eagle",
    location: "Mindanao, Philippines",
    author: "Maria Santos",
    description: "The majestic Philippine eagle soaring over the rainforests of Mindanao.",
    date: "Dec 10, 2025",
    image: "/animal-images/philippine-eagle.png",
    taxo: "bird",
  },
  {
    // Philippines - Philippine Tarsier
    position: [11.2, 124.0] as [number, number],
    title: "Philippine Tarsier",
    location: "Bohol, Philippines",
    author: "Juan dela Cruz",
    description: "Tiny Philippine tarsier spotted in the wild on Bohol island.",
    date: "Nov 22, 2025",
    image: "/animal-images/philippine-tarsier.png",
    taxo: "mammal",
  },
  {
    // Philippines - Tamaraw
    position: [12.5, 124.5] as [number, number],
    title: "Tamaraw",
    location: "Mindoro, Philippines",
    author: "Ana Reyes",
    description: "Endangered tamaraw grazing in the grasslands of Mindoro.",
    date: "Oct 15, 2025",
    image: "/animal-images/tamaraw.png",
    taxo: "mammal",
  },
  {
    // Philippines - Palawan Peacock Pheasant
    position: [9.8, 118.7] as [number, number],
    title: "Palawan Peacock Pheasant",
    location: "Palawan, Philippines",
    author: "Carlos Mendoza",
    description: "Vibrant Palawan peacock pheasant displaying its plumage in the jungle.",
    date: "Sep 8, 2025",
    image: "/animal-images/palawan-peacock-pheasant.png",
    taxo: "bird",
  },
  {
    // Philippines - Philippine Crocodile
    position: [10.5, 119.0] as [number, number],
    title: "Philippine Crocodile",
    location: "Palawan, Philippines",
    author: "Luz Fernandez",
    description: "Rare Philippine crocodile basking in the sun near a river.",
    date: "Aug 20, 2025",
    image: "/animal-images/philippine-crocodile.png",
    taxo: "reptile",
  },
  {
    // Philippines - Dugong
    position: [11.0, 119.5] as [number, number],
    title: "Dugong",
    location: "Palawan, Philippines",
    author: "Pedro Garcia",
    description: "Dugong swimming gracefully in the coastal waters of Palawan.",
    date: "Jul 12, 2025",
    image: "/animal-images/dugong.png",
    taxo: "mammal",
  },
  {
    // Philippines - Whale Shark
    position: [9.5, 118.5] as [number, number],
    title: "Whale Shark",
    location: "Donsol, Philippines",
    author: "Rosa Lim",
    description: "Massive whale shark spotted during the annual migration in Donsol.",
    date: "Jun 5, 2025",
    image: "/animal-images/whale-shark.png",
    taxo: "pisces",
  },
  {
    // Philippines - Calamian Deer
    position: [12.0, 120.0] as [number, number],
    title: "Calamian Deer",
    location: "Busuanga, Philippines",
    author: "Miguel Torres",
    description: "Calamian deer foraging in the forests of Busuanga island.",
    date: "May 18, 2025",
    image: "/animal-images/calamian-deer.png",
    taxo: "mammal",
  },
  {
    // Philippines - Philippine Flying Lemur
    position: [14.0, 121.5] as [number, number],
    title: "Philippine Flying Lemur",
    location: "Luzon, Philippines",
    author: "Elena Castro",
    description: "Philippine flying lemur gliding between trees in Luzon.",
    date: "Apr 10, 2025",
    image: "/animal-images/philippine-flying-lemur.png",
    taxo: "mammal",
  },
  {
    // Philippines - Visayan Warty Pig
    position: [10.8, 124.2] as [number, number],
    title: "Visayan Warty Pig",
    location: "Negros, Philippines",
    author: "Fernando Aquino",
    description: "Visayan warty pig rooting in the undergrowth on Negros island.",
    date: "Mar 25, 2025",
    image: "/animal-images/visayan-warty-pig.png",
    taxo: "mammal",
  },
  {
    // Madagascar - Fossa
    position: [-18.9, 47.5] as [number, number],
    title: "Fossa",
    location: "Madagascar",
    author: "Sophie Dubois",
    description: "Agile fossa hunting in the forests of Madagascar.",
    date: "Feb 14, 2025",
    image: "/animal-images/fossa.png",
    taxo: "mammal",
  },
  {
    // Antarctica - Emperor Penguin
    position: [-77.8, 166.7] as [number, number],
    title: "Emperor Penguin",
    location: "Antarctica",
    author: "Dr. Emma Wilson",
    description: "Emperor penguin colony thriving in the harsh Antarctic environment.",
    date: "Jan 5, 2025",
    image: "/animal-images/emperor-penguin.png",
    taxo: "bird",
  },
  {
    // Galapagos - Marine Iguana
    position: [-0.7, -90.3] as [number, number],
    title: "Marine Iguana",
    location: "Galapagos Islands, Ecuador",
    author: "Pablo Ramirez",
    description: "Marine iguana basking on the rocks in the Galapagos.",
    date: "Dec 20, 2024",
    image: "/animal-images/marine-iguana.png",
    taxo: "reptile",
  },
  {
    // Borneo - Orangutan
    position: [1.5, 110.3] as [number, number],
    title: "Orangutan",
    location: "Borneo, Indonesia",
    author: "Ahmad bin Hassan",
    description: "Orangutan swinging through the trees in Borneo rainforest.",
    date: "Nov 8, 2024",
    image: "/animal-images/orangutan.png",
    taxo: "mammal",
  },
  {
    // Himalayas - Snow Leopard
    position: [35.0, 75.0] as [number, number],
    title: "Snow Leopard",
    location: "Himalayas, Nepal",
    author: "Tenzin Dorje",
    description: "Elusive snow leopard prowling the high mountains of the Himalayas.",
    date: "Oct 12, 2024",
    image: "/animal-images/snow-leopard.png",
    taxo: "mammal",
  },
  {
    // Amazon - Poison Dart Frog
    position: [-4.0, -63.0] as [number, number],
    title: "Poison Dart Frog",
    location: "Amazon Rainforest, Peru",
    author: "Isabella Morales",
    description: "Colorful poison dart frog in the Peruvian Amazon.",
    date: "Sep 3, 2024",
    image: "/animal-images/poison-dart-frog.png",
    taxo: "amphibian",
  },
  {
    // Sahara - Fennec Fox
    position: [25.0, 10.0] as [number, number],
    title: "Fennec Fox",
    location: "Sahara Desert, Morocco",
    author: "Fatima Alami",
    description: "Fennec fox with large ears adapting to the desert heat.",
    date: "Aug 15, 2024",
    image: "/animal-images/fennec-fox.png",
    taxo: "mammal",
  },
  {
    // Great Barrier Reef - Clownfish
    position: [-18.3, 147.7] as [number, number],
    title: "Clownfish",
    location: "Great Barrier Reef, Australia",
    author: "Liam O'Sullivan",
    description: "Clownfish hiding in an anemone on the Great Barrier Reef.",
    date: "Jul 22, 2024",
    image: "/animal-images/clownfish.png",
    taxo: "pisces",
  },
  {
    // Yellowstone - Grizzly Bear
    position: [44.4, -110.6] as [number, number],
    title: "Grizzly Bear",
    location: "Yellowstone, USA",
    author: "John Anderson",
    description: "Grizzly bear fishing in Yellowstone National Park.",
    date: "Jun 10, 2024",
    image: "/animal-images/grizzly-bear.png",
    taxo: "mammal",
  },
];

function Markers({ locations, onMarkerClick, setPrevZoom, setPrevCenter, hideAllMarkers, setHideAllMarkers }: { locations: typeof wildlifeLocations; onMarkerClick?: (wildlife: any) => void; setPrevZoom: (zoom: number) => void; setPrevCenter: (center: L.LatLng) => void; hideAllMarkers: boolean; setHideAllMarkers: (hide: boolean) => void }) {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(3);

  useEffect(() => {
    const onZoom = () => setZoomLevel(map.getZoom());
    const onZoomEnd = () => {
      setZoomLevel(map.getZoom());
      setHideAllMarkers(false); // Show all markers again after zoom
    };
    map.on('zoom', onZoom);
    map.on('zoomend', onZoomEnd);
    return () => {
      map.off('zoom', onZoom);
      map.off('zoomend', onZoomEnd);
    };
  }, [map, setHideAllMarkers]);

  if (hideAllMarkers) return null; // Hide all markers

  return (
    <>
      {locations.map((wildlife, index) => {
        const colors = colorMap[wildlife.taxo] || { color: "gray", fillColor: "gray" };
        const radius = 5 + (zoomLevel - 3) * 0.4;
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
                setHideAllMarkers(true); // Hide all markers immediately
                setPrevZoom(map.getZoom());
                setPrevCenter(map.getCenter());
                map.flyTo(wildlife.position, 12, { duration: 1.5 });
                setTimeout(() => onMarkerClick?.(wildlife), 1000);
              },
            }}
          >
            {/* @ts-ignore */}
            <Tooltip direction="top" style={{ backgroundColor: 'rgba(0,0,0,0.9)', color: 'white', fontWeight: 'bold', padding: '8px 12px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', fontSize: '16px', border: '1px solid rgba(255,255,255,0.3)' }}>{wildlife.title}</Tooltip>
          </CircleMarker>
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

const WorldMap = forwardRef<{ handleZoomOut: () => void; flyTo: (lat: number, lng: number, zoom?: number) => void }, { onMarkerClick?: (wildlife: any) => void; showLegend?: boolean; filteredLocations?: typeof wildlifeLocations }>(({ onMarkerClick, showLegend, filteredLocations }, ref) => {
  const mapRef = useRef<L.Map | null>(null);
  const [prevZoom, setPrevZoom] = useState<number | null>(null);
  const [prevCenter, setPrevCenter] = useState<L.LatLng | null>(null);  const [hideAllMarkers, setHideAllMarkers] = useState(false);
  const [legendVisible, setLegendVisible] = useState(false);
  const handleZoomOut = () => {
    if (mapRef.current && prevZoom !== null && prevCenter) {
      mapRef.current.flyTo(prevCenter, prevZoom, { duration: 0.5 });
    }
  };
  const flyTo = (lat: number, lng: number, zoom: number = 6) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], zoom, { duration: 1.5 });
    }
  };

  useImperativeHandle(ref, () => ({
    handleZoomOut,
    flyTo,
  }));

  return (
    <div className="relative w-full h-full">
      <button
        className="absolute top-4 right-4 z-[1000] bg-white/20 backdrop-blur-sm p-2 rounded-full text-black font-bold hover:bg-white/30 transition-colors"
        onClick={() => setLegendVisible(!legendVisible)}
        title="legend"
      >
        i
      </button>

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
        {Object.entries(
          (filteredLocations || wildlifeLocations).reduce((acc, loc) => {
            if (!acc[loc.taxo]) acc[loc.taxo] = [];
            acc[loc.taxo].push(loc);
            return acc;
          }, {} as Record<string, typeof wildlifeLocations>)
        ).map(([taxo, locs]) => (
          <MarkerClusterGroup
            key={taxo}
            iconCreateFunction={(cluster: any) => {
              const count = cluster.getChildCount();
              const color = colorMap[taxo]?.color || 'gray';
              return L.divIcon({
                html: `<div style="background-color: ${color}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">${count}</div>`,
                className: 'custom-cluster-icon',
                iconSize: [30, 30],
              });
            }}
          >
            <Markers locations={locs} onMarkerClick={onMarkerClick} setPrevZoom={setPrevZoom} setPrevCenter={setPrevCenter} hideAllMarkers={hideAllMarkers} setHideAllMarkers={setHideAllMarkers} />
          </MarkerClusterGroup>
        ))}
      </MapContainer>

      {legendVisible && (
        <div className="fixed top-4 right-15 transform z-[1000] p-2 rounded-lg">
          <div className="flex flex-row space-x-4 text-lg">
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


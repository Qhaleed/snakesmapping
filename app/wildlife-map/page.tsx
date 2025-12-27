"use client";

import { useState, useRef, useEffect } from "react";
import BackButton from "../components/back-button";
import SearchModal from "../components/search-modal";
import WildlifeDetailModal from "../components/wildlife-detail-modal";
import WorldMap from "../components/world-map";

// Import the locations data
const wildlifeLocations = [
  {
    position: [-2.333333, 34.833333],
    title: "African Elephant",
    location: "Serengeti, Tanzania",
    author: "David Okoye",
    description: "A herd of elephants seen migrating across the Serengeti.",
    date: "Nov 20, 2025",
    image: "/animal-images/african-elephant.png",
    taxo: "mammal",
  },
  {
    position: [64.200841, -149.493673],
    title: "Bald Eagle",
    location: "Alaska, USA",
    author: "Emily Johnson",
    description: "Bald eagle spotted soaring over the forests of Alaska.",
    date: "Oct 12, 2025",
    image: "/animal-images/bald-eagle.png",
    taxo: "bird",
  },
  {
    position: [30.666667, 104.066667],
    title: "Giant Panda",
    location: "Sichuan, China",
    author: "Li Wei",
    description: "Giant panda observed eating bamboo in Sichuan.",
    date: "Sep 5, 2025",
    image: "/animal-images/giant-panda.png",
    taxo: "mammal",
  },
  {
    position: [-20.000000, 133.000000],
    title: "Red Kangaroo",
    location: "Northern Territory, Australia",
    author: "Sophie Brown",
    description: "Red kangaroo hopping across the outback.",
    date: "Aug 18, 2025",
    image: "/animal-images/red-kangaroo.png",
    taxo: "mammal",
  },
  {
    position: [-3.4653, -62.2159],
    title: "King Cobra",
    location: "Amazon Rainforest, Brazil",
    author: "Carlos Silva",
    description: "King cobra sighted in the dense Amazon rainforest.",
    date: "Jul 10, 2025",
    image: "/animal-images/king-cobra.png",
    taxo: "reptile",
  },
  {
    position: [-12.4634, 130.8456],
    title: "Saltwater Crocodile",
    location: "Northern Territory, Australia",
    author: "Jack Thompson",
    description: "Large saltwater crocodile spotted in the rivers of northern Australia.",
    date: "Jun 15, 2025",
    image: "/animal-images/saltwater-crocodile.png",
    taxo: "reptile",
  },
  {
    position: [-3.1190, -60.0217],
    title: "Scarlet Macaw",
    location: "Amazon Rainforest, Brazil",
    author: "Maria Gonzalez",
    description: "Vibrant scarlet macaw observed in the canopy of the Amazon.",
    date: "May 22, 2025",
    image: "/animal-images/scarlet-macaw.png",
    taxo: "bird",
  },
  {
    position: [-0.1807, -78.4678],
    title: "Poison Dart Frog",
    location: "Amazon Rainforest, Ecuador",
    author: "Luis Ramirez",
    description: "Colorful poison dart frog found in the Ecuadorian rainforest.",
    date: "Apr 8, 2025",
    image: "/animal-images/poison-dart-frog.png",
    taxo: "amphibian",
  },
  {
    position: [-1.2921, 36.8219],
    title: "Cheetah",
    location: "Masai Mara, Kenya",
    author: "Anna Wanjiku",
    description: "Cheetah hunting on the plains of the Masai Mara.",
    date: "Mar 14, 2025",
    image: "/animal-images/cheetah.png",
    taxo: "mammal",
  },
  {
    position: [-33.7, -118.2],
    title: "Great White Shark",
    location: "Pacific Ocean, USA",
    author: "Mike Ocean",
    description: "Great white shark spotted off the coast of California.",
    date: "Feb 20, 2025",
    image: "/animal-images/great-white-shark.png",
    taxo: "pisces",
  },
  {
    position: [40, -100],
    title: "Monarch Butterfly",
    location: "Great Plains, USA",
    author: "Sarah Fields",
    description: "Monarch butterfly migrating across the plains.",
    date: "Jan 10, 2025",
    image: "/animal-images/monarch-butterfly.png",
    taxo: "insecta",
  },
  {
    position: [34, -118],
    title: "Black Widow Spider",
    location: "Los Angeles, USA",
    author: "Tom Weaver",
    description: "Black widow spider found in urban area.",
    date: "Dec 5, 2024",
    image: "/animal-images/black-widow-spider.png",
    taxo: "arachnida",
  },
  {
    position: [37, -76],
    title: "Blue Crab",
    location: "Chesapeake Bay, USA",
    author: "River Smith",
    description: "Blue crab caught in the Chesapeake Bay.",
    date: "Nov 15, 2024",
    image: "/animal-images/blue-crab.png",
    taxo: "crustacea",
  },
  {
    position: [13.5, 121.0],
    title: "Philippine Eagle",
    location: "Mindanao, Philippines",
    author: "Maria Santos",
    description: "The majestic Philippine eagle soaring over the rainforests of Mindanao.",
    date: "Dec 10, 2025",
    image: "/animal-images/philippine-eagle.png",
    taxo: "bird",
  },
  {
    position: [11.2, 124.0],
    title: "Philippine Tarsier",
    location: "Bohol, Philippines",
    author: "Juan dela Cruz",
    description: "Tiny Philippine tarsier spotted in the wild on Bohol island.",
    date: "Nov 22, 2025",
    image: "/animal-images/philippine-tarsier.png",
    taxo: "mammal",
  },
  {
    position: [12.5, 124.5],
    title: "Tamaraw",
    location: "Mindoro, Philippines",
    author: "Ana Reyes",
    description: "Endangered tamaraw grazing in the grasslands of Mindoro.",
    date: "Oct 15, 2025",
    image: "/animal-images/tamaraw.png",
    taxo: "mammal",
  },
  {
    position: [9.8, 118.7],
    title: "Palawan Peacock Pheasant",
    location: "Palawan, Philippines",
    author: "Carlos Mendoza",
    description: "Vibrant Palawan peacock pheasant displaying its plumage in the jungle.",
    date: "Sep 8, 2025",
    image: "/animal-images/palawan-peacock-pheasant.png",
    taxo: "bird",
  },
  {
    position: [10.5, 119.0],
    title: "Philippine Crocodile",
    location: "Palawan, Philippines",
    author: "Luz Fernandez",
    description: "Rare Philippine crocodile basking in the sun near a river.",
    date: "Aug 20, 2025",
    image: "/animal-images/philippine-crocodile.png",
    taxo: "reptile",
  },
  {
    position: [11.0, 119.5],
    title: "Dugong",
    location: "Palawan, Philippines",
    author: "Pedro Garcia",
    description: "Dugong swimming gracefully in the coastal waters of Palawan.",
    date: "Jul 12, 2025",
    image: "/animal-images/dugong.png",
    taxo: "mammal",
  },
  {
    position: [9.5, 118.5],
    title: "Whale Shark",
    location: "Donsol, Philippines",
    author: "Rosa Lim",
    description: "Massive whale shark spotted during the annual migration in Donsol.",
    date: "Jun 5, 2025",
    image: "/animal-images/whale-shark.png",
    taxo: "pisces",
  },
  {
    position: [12.0, 120.0],
    title: "Calamian Deer",
    location: "Busuanga, Philippines",
    author: "Miguel Torres",
    description: "Calamian deer foraging in the forests of Busuanga island.",
    date: "May 18, 2025",
    image: "/animal-images/calamian-deer.png",
    taxo: "mammal",
  },
  {
    position: [14.0, 121.5],
    title: "Philippine Flying Lemur",
    location: "Luzon, Philippines",
    author: "Elena Castro",
    description: "Philippine flying lemur gliding between trees in Luzon.",
    date: "Apr 10, 2025",
    image: "/animal-images/philippine-flying-lemur.png",
    taxo: "mammal",
  },
  {
    position: [10.8, 124.2],
    title: "Visayan Warty Pig",
    location: "Negros, Philippines",
    author: "Fernando Aquino",
    description: "Visayan warty pig rooting in the undergrowth on Negros island.",
    date: "Mar 25, 2025",
    image: "/animal-images/visayan-warty-pig.png",
    taxo: "mammal",
  },
  {
    position: [-18.9, 47.5],
    title: "Fossa",
    location: "Madagascar",
    author: "Sophie Dubois",
    description: "Agile fossa hunting in the forests of Madagascar.",
    date: "Feb 14, 2025",
    image: "/animal-images/fossa.png",
    taxo: "mammal",
  },
  {
    position: [-77.8, 166.7],
    title: "Emperor Penguin",
    location: "Antarctica",
    author: "Dr. Emma Wilson",
    description: "Emperor penguin colony thriving in the harsh Antarctic environment.",
    date: "Jan 5, 2025",
    image: "/animal-images/emperor-penguin.png",
    taxo: "bird",
  },
  {
    position: [-0.7, -90.3],
    title: "Marine Iguana",
    location: "Galapagos Islands, Ecuador",
    author: "Pablo Ramirez",
    description: "Marine iguana basking on the rocks in the Galapagos.",
    date: "Dec 20, 2024",
    image: "/animal-images/marine-iguana.png",
    taxo: "reptile",
  },
  {
    position: [1.5, 110.3],
    title: "Orangutan",
    location: "Borneo, Indonesia",
    author: "Ahmad bin Hassan",
    description: "Orangutan swinging through the trees in Borneo rainforest.",
    date: "Nov 8, 2024",
    image: "/animal-images/orangutan.png",
    taxo: "mammal",
  },
  {
    position: [35.0, 75.0],
    title: "Snow Leopard",
    location: "Himalayas, Nepal",
    author: "Tenzin Dorje",
    description: "Elusive snow leopard prowling the high mountains of the Himalayas.",
    date: "Oct 12, 2024",
    image: "/animal-images/snow-leopard.png",
    taxo: "mammal",
  },
  {
    position: [-4.0, -63.0],
    title: "Poison Dart Frog",
    location: "Amazon Rainforest, Peru",
    author: "Isabella Morales",
    description: "Colorful poison dart frog in the Peruvian Amazon.",
    date: "Sep 3, 2024",
    image: "/animal-images/poison-dart-frog.png",
    taxo: "amphibian",
  },
  {
    position: [25.0, 10.0],
    title: "Fennec Fox",
    location: "Sahara Desert, Morocco",
    author: "Fatima Alami",
    description: "Fennec fox with large ears adapting to the desert heat.",
    date: "Aug 15, 2024",
    image: "/animal-images/fennec-fox.png",
    taxo: "mammal",
  },
  {
    position: [-18.3, 147.7],
    title: "Clownfish",
    location: "Great Barrier Reef, Australia",
    author: "Liam O'Sullivan",
    description: "Clownfish hiding in an anemone on the Great Barrier Reef.",
    date: "Jul 22, 2024",
    image: "/animal-images/clownfish.png",
    taxo: "pisces",
  },
  {
    position: [44.4, -110.6],
    title: "Grizzly Bear",
    location: "Yellowstone, USA",
    author: "John Anderson",
    description: "Grizzly bear fishing in Yellowstone National Park.",
    date: "Jun 10, 2024",
    image: "/animal-images/grizzly-bear.png",
    taxo: "mammal",
  },
];

export default function WildlifeMap() {
  const [animalQuery, setAnimalQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  
  // Filter states
  const [taxonomyFilter, setTaxonomyFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [filteredLocations, setFilteredLocations] = useState<any[] | null>(null);
  
  const [selectedWildlife, setSelectedWildlife] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const worldMapRef = useRef<{ handleZoomOut: () => void; flyTo: (lat: number, lng: number, zoom?: number) => void; resetView: () => void } | null>(null);

  useEffect(() => {
    if (searchResults.length > 0 && currentResultIndex < searchResults.length) {
      const current = searchResults[currentResultIndex];
      worldMapRef.current?.flyTo(current.position[0], current.position[1], 10);
      setSelectedWildlife(current);
      setModalVisible(true);
    }
  }, [currentResultIndex, searchResults]);

  const handleMarkerClick = (wildlife: any) => {
    setSelectedWildlife(wildlife);
    setModalVisible(true);
  };

  const onAnimalSearch = () => {
    if (!animalQuery.trim()) return;

    const query = animalQuery.toLowerCase().trim();
    
    // Start with all locations or filtered locations if filters are active
    let baseLocations = wildlifeLocations;
    if (filteredLocations) {
      baseLocations = filteredLocations;
    }
    
    const results = baseLocations.filter(loc => 
      loc.title.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
    setCurrentResultIndex(0);
    
    if (results.length > 0) {
      const first = results[0];
      worldMapRef.current?.flyTo(first.position[0], first.position[1], 10);
      handleMarkerClick(first);
    }
  };

  const onApplyFilters = () => {
    let filtered = [...wildlifeLocations];

    // Apply taxonomy filter
    if (taxonomyFilter) {
      filtered = filtered.filter(loc => loc.taxo === taxonomyFilter);
    }

    // Apply author filter
    if (authorFilter.trim()) {
      const authorQuery = authorFilter.toLowerCase().trim();
      filtered = filtered.filter(loc => 
        loc.author.toLowerCase().includes(authorQuery)
      );
    }

    // Apply region filter
    if (regionFilter) {
      // For region filtering, we need to define which countries belong to which regions
      const regionCountries: Record<string, string[]> = {
        'africa': ['kenya', 'morocco', 'south africa', 'egypt'],
        'asia': ['china', 'philippines', 'japan', 'india', 'thailand', 'malaysia', 'indonesia'],
        'europe': [],
        'north america': ['usa', 'canada', 'mexico'],
        'south america': ['brazil', 'ecuador', 'peru', 'argentina'],
        'australia': ['australia'],
        'antarctica': []
      };
      
      const countriesInRegion = regionCountries[regionFilter] || [];
      filtered = filtered.filter(loc => {
        // Check if location's country matches any in the region
        const locationCountry = loc.location.toLowerCase();
        return countriesInRegion.some(country => locationCountry.includes(country));
      });
    }

    // Apply country filter
    if (countryFilter) {
      filtered = filtered.filter(loc => 
        loc.location.toLowerCase().includes(countryFilter)
      );
    }

    setFilteredLocations(filtered.length > 0 ? filtered : null);
    setSearchResults([]); // Clear animal search results when applying filters
    setCurrentResultIndex(0);

    // Zoom to region if region filter is applied and no country filter
    if (regionFilter && !countryFilter) {
      const regionCoords: Record<string, [number, number]> = {
        'africa': [0, 20],
        'asia': [30, 100],
        'europe': [50, 10],
        'north america': [40, -100],
        'south america': [-15, -55],
        'australia': [-25, 135],
        'antarctica': [-80, 0],
      };
      const coords = regionCoords[regionFilter];
      if (coords) {
        worldMapRef.current?.flyTo(coords[0], coords[1], 3);
      }
    }

    // Zoom to country if country filter is applied
    if (countryFilter) {
      const locations: Record<string, [number, number]> = {
        'usa': [40, -100],
        'china': [35, 105],
        'brazil': [-10, -55],
        'kenya': [0, 38],
        'indonesia': [-2, 118],
        'ecuador': [-2, -78],
        'australia': [-25, 135],
        'peru': [-10, -75],
        'morocco': [32, -5],
        'philippines': [12, 122],
        'japan': [36, 138],
        'india': [20, 78],
        'russia': [60, 100],
        'canada': [60, -100],
        'mexico': [23, -102],
        'argentina': [-34, -64],
        'south africa': [-30, 25],
        'egypt': [26, 30],
        'thailand': [15, 101],
        'malaysia': [4, 102],
      };
      const coords = locations[countryFilter];
      if (coords) {
        worldMapRef.current?.flyTo(coords[0], coords[1], 4);
      }
    }
  };

  const onClearFilters = () => {
    setTaxonomyFilter("");
    setAuthorFilter("");
    setRegionFilter("");
    setCountryFilter("");
    setFilteredLocations(null);
    setSearchResults([]);
    setCurrentResultIndex(0);
    setAnimalQuery("");
    worldMapRef.current?.resetView();
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
        <WorldMap 
          ref={worldMapRef} 
          onMarkerClick={handleMarkerClick} 
          showLegend={true} 
          filteredLocations={filteredLocations || undefined}
        />
      </div>

      {/* Search Modal */}
      <SearchModal 
        animalQuery={animalQuery}
        setAnimalQuery={setAnimalQuery}
        onAnimalSearch={onAnimalSearch}
        searchResults={searchResults}
        currentResultIndex={currentResultIndex}
        setCurrentResultIndex={setCurrentResultIndex}
        taxonomyFilter={taxonomyFilter}
        setTaxonomyFilter={setTaxonomyFilter}
        authorFilter={authorFilter}
        setAuthorFilter={setAuthorFilter}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        onApplyFilters={onApplyFilters}
        onClearFilters={onClearFilters}
      />

      {/* Wildlife Detail Modal */}
      <WildlifeDetailModal selectedWildlife={selectedWildlife} closeModal={closeModal} visible={modalVisible} />
    </div>
  );
}
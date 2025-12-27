"use client";

interface SearchModalProps {
  // Animal search
  animalQuery: string;
  setAnimalQuery: (value: string) => void;
  onAnimalSearch: () => void;
  searchResults: any[];
  currentResultIndex: number;
  setCurrentResultIndex: (index: number) => void;
  
  // Filters
  taxonomyFilter: string;
  setTaxonomyFilter: (value: string) => void;
  authorFilter: string;
  setAuthorFilter: (value: string) => void;
  regionFilter: string;
  setRegionFilter: (value: string) => void;
  countryFilter: string;
  setCountryFilter: (value: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export default function SearchModal({
  animalQuery,
  setAnimalQuery,
  onAnimalSearch,
  searchResults,
  currentResultIndex,
  setCurrentResultIndex,
  taxonomyFilter,
  setTaxonomyFilter,
  authorFilter,
  setAuthorFilter,
  regionFilter,
  setRegionFilter,
  countryFilter,
  setCountryFilter,
  onApplyFilters,
  onClearFilters
}: SearchModalProps) {
  const handleAnimalKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAnimalSearch();
    }
  };

  const nextResult = () => {
    if (searchResults.length > 0) {
      setCurrentResultIndex((currentResultIndex + 1) % searchResults.length);
    }
  };

  const prevResult = () => {
    if (searchResults.length > 0) {
      setCurrentResultIndex(currentResultIndex === 0 ? searchResults.length - 1 : currentResultIndex - 1);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1001]">
      <div className="relative overflow-hidden border-t border-white/20 bg-white/10 px-6 py-3 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)]" />

        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold text-black drop-shadow-sm mb-2 text-center">Search & Filter Wildlife</h3>
          
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Animal Search */}
            <div className="bg-white/5 p-2 rounded-lg lg:w-1/3">
              <h4 className="text-sm font-medium text-black mb-1">Search Specific Animal</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter animal name..."
                  value={animalQuery}
                  onChange={(e) => setAnimalQuery(e.target.value)}
                  onKeyPress={handleAnimalKeyPress}
                  className="flex-1 px-3 py-1 bg-white/20 border border-white/30 rounded text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm text-sm"
                />
                <button 
                  onClick={onAnimalSearch}
                  className="bg-green-500/80 text-white px-3 py-1 rounded-lg hover:bg-green-600/80 backdrop-blur-sm text-sm"
                >
                  Search
                </button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button 
                    onClick={prevResult}
                    className="bg-blue-500/80 text-white px-2 py-1 rounded hover:bg-blue-600/80 text-sm"
                  >
                    ‹
                  </button>
                  <span className="text-black font-semibold text-sm">
                    {currentResultIndex + 1} / {searchResults.length}
                  </span>
                  <button 
                    onClick={nextResult}
                    className="bg-blue-500/80 text-white px-2 py-1 rounded hover:bg-blue-600/80 text-sm"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white/5 p-2 rounded-lg lg:w-2/3">
              <h4 className="text-sm font-medium text-black mb-1">Apply Filters</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-black/80 mb-1">Taxonomy</label>
                  <select
                    value={taxonomyFilter}
                    onChange={(e) => setTaxonomyFilter(e.target.value)}
                    className="w-full px-2 py-1 bg-white/20 border border-white/30 rounded text-black focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                  >
                    <option value="">All</option>
                    <option value="mammal">Mammalia</option>
                    <option value="bird">Aves</option>
                    <option value="reptile">Reptilia</option>
                    <option value="amphibian">Amphibia</option>
                    <option value="pisces">Pisces</option>
                    <option value="insecta">Insecta</option>
                    <option value="arachnida">Arachnida</option>
                    <option value="crustacea">Crustacea</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-black/80 mb-1">Author</label>
                  <input
                    type="text"
                    placeholder="Enter author..."
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                    className="w-full px-2 py-1 bg-white/20 border border-white/30 rounded text-black placeholder-black/70 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-black/80 mb-1">Region</label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full px-2 py-1 bg-white/20 border border-white/30 rounded text-black focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                  >
                    <option value="">All</option>
                    <option value="africa">Africa</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="north america">North America</option>
                    <option value="south america">South America</option>
                    <option value="australia">Australia & Oceania</option>
                    <option value="antarctica">Antarctica</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-black/80 mb-1">Country</label>
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="w-full px-2 py-1 bg-white/20 border border-white/30 rounded text-black focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                  >
                    <option value="">All</option>
                    <option value="usa">USA</option>
                    <option value="china">China</option>
                    <option value="brazil">Brazil</option>
                    <option value="kenya">Kenya</option>
                    <option value="indonesia">Indonesia</option>
                    <option value="ecuador">Ecuador</option>
                    <option value="australia">Australia</option>
                    <option value="peru">Peru</option>
                    <option value="morocco">Morocco</option>
                    <option value="philippines">Philippines</option>
                    <option value="japan">Japan</option>
                    <option value="india">India</option>
                    <option value="russia">Russia</option>
                    <option value="canada">Canada</option>
                    <option value="mexico">Mexico</option>
                    <option value="argentina">Argentina</option>
                    <option value="south africa">S. Africa</option>
                    <option value="egypt">Egypt</option>
                    <option value="thailand">Thailand</option>
                    <option value="malaysia">Malaysia</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-2 mt-2 justify-end">
                <button 
                  onClick={onApplyFilters}
                  className="flex-1 bg-blue-500/80 text-white py-1 rounded-lg hover:bg-blue-600/80 backdrop-blur-sm text-sm"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={onClearFilters}
                  className="bg-gray-500/80 text-white px-3 py-1 rounded-lg hover:bg-gray-600/80 backdrop-blur-sm text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
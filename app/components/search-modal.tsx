"use client";

interface SearchModalProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchType: string;
  setSearchType: (value: string) => void;
  onSearch: () => void;
  searchResults: any[];
  currentResultIndex: number;
  setCurrentResultIndex: (index: number) => void;
}

export default function SearchModal({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  onSearch,
  searchResults,
  currentResultIndex,
  setCurrentResultIndex
}: SearchModalProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
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
      <div className="relative flex items-center justify-center overflow-hidden border-t border-white/20 bg-white/10 px-8 py-4 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)]" />

        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-semibold text-black drop-shadow-sm mb-2">Search for Wildlife</h3>
          
          <div className="flex gap-2 mb-2">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-2 py-1 bg-white/20 border border-white/30 rounded text-black focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              <option value="animal">Animal</option>
              <option value="taxonomy">Taxonomy</option>
              <option value="author">Author</option>
              <option value="region">Region</option>
              <option value="country">Country</option>
            </select>
            
            {searchType === 'taxonomy' ? (
              <select
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-1 bg-white/20 border border-white/30 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              >
                <option value="">Select taxonomy...</option>
                <option value="all">All</option>
                <option value="mammal">Mammalia</option>
                <option value="bird">Aves</option>
                <option value="reptile">Reptilia</option>
                <option value="amphibian">Amphibia</option>
                <option value="pisces">Pisces</option>
                <option value="insecta">Insecta</option>
                <option value="arachnida">Arachnida</option>
                <option value="crustacea">Crustacea</option>
              </select>
            ) : searchType === 'region' ? (
              <select
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-1 bg-white/20 border border-white/30 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              >
                <option value="">Select region...</option>
                <option value="africa">Africa</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="north america">North America</option>
                <option value="south america">South America</option>
                <option value="australia">Australia & Oceania</option>
                <option value="antarctica">Antarctica</option>
              </select>
            ) : searchType === 'country' ? (
              <select
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-1 bg-white/20 border border-white/30 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              >
                <option value="">Select country...</option>
                <option value="usa">United States</option>
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
                <option value="south africa">South Africa</option>
                <option value="egypt">Egypt</option>
                <option value="thailand">Thailand</option>
                <option value="malaysia">Malaysia</option>
              </select>
            ) : (
              <input
                type="text"
                placeholder={`Enter ${searchType}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-3 py-1 bg-white/20 border border-white/30 rounded text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              />
            )}
          </div>

          <div className="flex gap-2 items-center justify-center">
            <button 
              onClick={onSearch}
              className="bg-green-500/80 text-white px-4 py-2 rounded-lg hover:bg-green-600/80 backdrop-blur-sm"
            >
              Search
            </button>
            
            {searchType === 'animal' && searchResults.length > 0 && (
              <>
                <button 
                  onClick={prevResult}
                  className="bg-blue-500/80 text-white px-3 py-2 rounded-lg hover:bg-blue-600/80"
                >
                  ‹
                </button>
                <span className="text-black font-semibold">
                  {currentResultIndex + 1} / {searchResults.length}
                </span>
                <button 
                  onClick={nextResult}
                  className="bg-blue-500/80 text-white px-3 py-2 rounded-lg hover:bg-blue-600/80"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

interface SearchModalProps {
  searchAnimal: string;
  setSearchAnimal: (value: string) => void;
}

export default function SearchModal({ searchAnimal, setSearchAnimal }: SearchModalProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1001]">
      <div className="relative flex items-center justify-center overflow-hidden border-t border-white/20 bg-white/10 px-8 py-4 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)]" />

        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-semibold text-black drop-shadow-sm mb-2">Search for Wildlife</h3>
          <input
            type="text"
            placeholder="Enter animal name..."
            value={searchAnimal}
            onChange={(e) => setSearchAnimal(e.target.value)}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm border "
          />
          <button className="mt-2 w-full bg-green-500/80 text-white py-2 rounded-lg hover:bg-green-600/80 backdrop-blur-sm">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
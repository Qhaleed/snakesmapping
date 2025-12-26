"use client";

import Image from "next/image";

// Mock recent entries (replace with real data fetching)
const recentEntries = [
  { id: 1, image: "/animal-images/african-elephant.png", author: "David Okoye", title: "African Elephant" },
  { id: 2, image: "/animal-images/bald-eagle.png", author: "Emily Johnson", title: "Bald Eagle" },
  { id: 3, image: "/animal-images/giant-panda.png", author: "Li Wei", title: "Giant Panda" },
  { id: 4, image: "/animal-images/red-kangaroo.png", author: "Sophie Brown", title: "Red Kangaroo" },
  { id: 5, image: "/animal-images/king-cobra.png", author: "Carlos Silva", title: "King Cobra" },
  { id: 6, image: "/animal-images/saltwater-crocodile.png", author: "Jack Thompson", title: "Saltwater Crocodile" },
  { id: 7, image: "/animal-images/scarlet-macaw.png", author: "Maria Gonzalez", title: "Scarlet Macaw" },
  { id: 8, image: "/animal-images/poison-dart-frog.png", author: "Luis Ramirez", title: "Poison Dart Frog" },
  { id: 9, image: "/animal-images/cheetah.png", author: "Anna Wanjiku", title: "Cheetah" },
    { id: 10, image: "/animal-images/monarch-butterfly.png", author: "Sarah Fields", title: "Monarch Butterfly" },
  { id: 11, image: "/animal-images/black-widow-spider.png", author: "Tom Weaver", title: "Black Widow Spider" },
  { id: 12, image: "/animal-images/blue-crab.png", author: "River Smith", title: "Blue Crab" },
];

export default function NewEntryLoader() {
  return (
    <div className="w-full h-auto bg-black overflow-hidden relative py-3">
      <div className="flex animate-scroll">
        {/* Duplicate the list for seamless scrolling */}
        {[...recentEntries, ...recentEntries].map((entry, index) => (
          <div key={`${entry.id}-${index}`} className="flex-shrink-0 w-128 h-42 mx-2 relative overflow-hidden">
            <Image
              src={entry.image}
              alt={entry.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0  bg-opacity-50 text-white text-xs p-2">
              <p className="font-semibold">{entry.title}</p>
              <p>by {entry.author}</p>
              <p>Location: Sample</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  );
}

import HorizontalWildlifeCard from "./horizontal-wildlife-card";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const WorldMap = dynamic(() => import("./world-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-gray-200 animate-pulse" />
  ),
});

export default function LowerBox() {
  return (
    <>
      <div className="flex w-full mb-10">
        {/* Left side */}
        <div
          className="w-1/3 flex flex-col px-10 pt-10 gap-4"
          style={{ height: "450px", overflowY: "scroll" }}
        >
          <HorizontalWildlifeCard
            title="African Elephant"
            author="David Okoye"
            imageLink="/african-elephant.jpg"
            description="A herd of elephants seen migrating across the Serengeti."
            location="Serengeti, Tanzania"
            calendar="Nov 20, 2025"
            authorImage="/elephant-avatar.png"
          />
          <HorizontalWildlifeCard
            title="Bald Eagle"
            author="Emily Johnson"
            imageLink="/bald-eagle.jpg"
            description="Bald eagle spotted soaring over the forests of Alaska."
            location="Alaska, USA"
            calendar="Oct 12, 2025"
            authorImage="/baldeagle-avatar.png"
          />
          <HorizontalWildlifeCard
            title="Giant Panda"
            author="Li Wei"
            imageLink="/giant-panda.jpg"
            description="Giant panda observed eating bamboo in Sichuan."
            location="Sichuan, China"
            calendar="Sep 5, 2025"
            authorImage="/panda-avatar.png"
          />
          <HorizontalWildlifeCard
            title="Red Kangaroo"
            author="Sophie Brown"
            imageLink="/red-kangaroo.jpg"
            description="Red kangaroo hopping across the outback."
            location="Northern Territory, Australia"
            calendar="Aug 18, 2025"
            authorImage="/kangaroo-avatar.png"
          />
        
        </div>
        {/* Right side */}
        <div className="w-2/3 h-[450px] p-6">
          <WorldMap />
        </div>
      </div>
    </>
  );
}

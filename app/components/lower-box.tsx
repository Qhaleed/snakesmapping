import HorizontalWildlifeCard from "./horizontal-wildlife-card";
import WorldMap from "./world-map";

export default function LowerBox() {
  return (
    <>
      <div className="flex w-full mb-10 ">
        {/* Left side */}
        <div
          className="w-1/3 flex flex-col px-10 pt-10 gap-4"
          style={{ height: "450px", overflowY: "scroll" }}
        >
          <HorizontalWildlifeCard
            title="African Elephant"
            author="David Okoye"
            imageLink="/animal-images/african-elephant.png"
            description="A herd of elephants seen migrating across the Serengeti."
            location="Serengeti, Tanzania"
            calendar="Nov 20, 2025"
            authorImage="/animal-images/elephant-avatar.png"
          />
          <HorizontalWildlifeCard
            title="Bald Eagle"
            author="Emily Johnson"
            imageLink="/animal-images/bald-eagle.png"
            description="Bald eagle spotted soaring over the forests of Alaska."
            location="Alaska, USA"
            calendar="Oct 12, 2025"
            authorImage="/animal-images/baldeagle-avatar.png"
          />
          <HorizontalWildlifeCard
            title="Giant Panda"
            author="Li Wei"
            imageLink="/animal-images/giant-panda.png"
            description="Giant panda observed eating bamboo in Sichuan."
            location="Sichuan, China"
            calendar="Sep 5, 2025"
            authorImage="/animal-images/panda-avatar.png"
          />
          <HorizontalWildlifeCard
            title="Red Kangaroo"
            author="Sophie Brown"
            imageLink="/animal-images/red-kangaroo.png"
            description="Red kangaroo hopping across the outback."
            location="Northern Territory, Australia"
            calendar="Aug 18, 2025"
            authorImage="/animal-images/red-kangaroo.png"
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

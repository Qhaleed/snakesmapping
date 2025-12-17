import HorizontalSnakeCard from "./horizontal-snake-card";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const PhilippinesMap = dynamic(() => import("./philippines-map"), {
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
          <HorizontalSnakeCard
            title="Philippine Rat Snake"
            author="Juan Santos"
            imageLink="/snake-2.png"
            description="1.4 meter orange-brown Philippine Rat Snake observed hunting in Nueva Ecija farmlands"
            location="Nueva Ecija, Philippines"
            calendar="Dec 15, 2025"
          />
          <HorizontalSnakeCard
            title="King Cobra"
            author="Maria Cruz"
            imageLink="/ph-king-cobra.jpg"
            description="Large venomous snake spotted near rice paddies in Palawan"
            location="Palawan, Philippines"
            calendar="Dec 10, 2025"
          />
          <HorizontalSnakeCard
            title="Reticulated Python"
            author="Pedro Reyes"
            imageLink="/rt-py.jpg"
            description="6 meter python found coiled near river bank in Mindanao"
            location="Davao, Philippines"
            calendar="Dec 8, 2025"
          />
          <HorizontalSnakeCard
            title="Philippine Pit Viper"
            author="Ana Lopez"
            imageLink="/ph-pit-viper.jpg"
            description="Green pit viper spotted in mountain trail during hike"
            location="Baguio, Philippines"
            calendar="Dec 5, 2025"
          />
        </div>
        {/* Right side */}
        <div className="w-2/3 h-[450px] p-6">
          <PhilippinesMap />
        </div>
      </div>
    </>
  );
}

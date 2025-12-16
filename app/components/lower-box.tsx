import HorizontalSnakeCard from "./horizontal-snake-card";

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
            imageLink="/snake-2.png"
            description="Large venomous snake spotted near rice paddies in Palawan"
            location="Palawan, Philippines"
            calendar="Dec 10, 2025"
          />
          <HorizontalSnakeCard
            title="Reticulated Python"
            author="Pedro Reyes"
            imageLink="/snake-2.png"
            description="6 meter python found coiled near river bank in Mindanao"
            location="Davao, Philippines"
            calendar="Dec 8, 2025"
          />
          <HorizontalSnakeCard
            title="Philippine Pit Viper"
            author="Ana Lopez"
            imageLink="/snake-2.png"
            description="Green pit viper spotted in mountain trail during hike"
            location="Baguio, Philippines"
            calendar="Dec 5, 2025"
          />
        </div>
        {/* Right side */}
        <div className="w-2/3">
          <HorizontalSnakeCard
            title="Samar Cobra"
            author="Carlos Tan"
            imageLink="/snake-2.png"
            description="Rare Samar cobra documented in Eastern Visayas forest reserve"
            location="Samar, Philippines"
            calendar="Dec 12, 2025"
          />
        </div>
      </div>
    </>
  );
}

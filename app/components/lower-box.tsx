import HorizontalSnakeCard from "./horizontal-snake-card";

export default function LowerBox() {
  return (
    <>
      <div>
        {/* Left side */}
        <div>
          <HorizontalSnakeCard />
        </div>
        {/* Right side */}
        <div></div>
      </div>
    </>
  );
}

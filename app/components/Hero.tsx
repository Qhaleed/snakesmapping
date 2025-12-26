import Image from "next/image";
import Search from "./search";
export default function Hero() {
  return (
    <>
      <div className="relative h-[60vh] w-full">
        <Image
          src="/hero-banner.png"
          alt="wildlife-banner"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-white drop-shadow-lg">
          <h1 className="text-3xl  sm:text-4xl md:text-5xl">
            <span className="font-bold">WildlifePhotography:</span> Global Wildlife
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl">
            Discover, identify, and map wildlife worldwide
          </h2>

          <Search></Search>
        </div>
      </div>
    </>
  );
}

"use client";

import Hero from "./components/Hero";
import LowerBox from "./components/lower-box";
import NewEntryLoader from "./components/new-entry-loader";

export default function Home() {
  return (
    <div className="">
      <main>
        <Hero />
        <NewEntryLoader />
        <LowerBox />
      </main>
    </div>
  );
}

"use client";

import Image from "next/image";

const screenHeight = window.screen.height / 2;
console.log(screenHeight);

export default function AdminDashboard() {
  return (
    <>
      <div className="relative h-[60vh] w-full">
        <Image
          src="/hero-banner.png"
          alt="snake-banner"
          fill
          className="object-cover"
        />
      </div>
    </>
  );
}

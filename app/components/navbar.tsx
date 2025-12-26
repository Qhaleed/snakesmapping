"use client";

import { usePathname } from "next/navigation";
import Button from "./button";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/wildlife-map") {
    return null;
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-[999]">
      <div className="relative  flex items-center justify-between overflow-hidden border border-white/20 bg-white/10 px-8 py-4 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)]" />

        <h1 className="text-xl font-bold text-white drop-shadow-sm">
          MyWildlife
        </h1>

        <div className="flex items-center gap-10 text-white">
          <ul className="flex items-center gap-8 text-sm font-medium">
            
            <Link href="/">
            <li>Home</li>
            
            </Link>
            <Link href="/wildlife-map">
            <li>Find</li>
            
            </Link>
            <li>Community</li>
            <Link href="/leaderboards">
            <li>Leaderboards</li>

            </Link>
          </ul>

          <ul className="flex items-center gap-4 text-sm font-medium">
            <li>Contact</li>

            <li>
              <Button name="Signup" variant="active" />
            </li>
            <li>
              <Button name="Register" variant="inactive" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

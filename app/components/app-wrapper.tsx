"use client";

import { useState, useEffect } from "react";
import Loading from "./loading";

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if it's the first load
    const isFirstLoad = !localStorage.getItem("visited");
    const delay = isFirstLoad ? 3000 : 1000; // 3s for first, 1s for refresh

    const timer = setTimeout(() => {
      setLoading(false);
      localStorage.setItem("visited", "true");
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
}
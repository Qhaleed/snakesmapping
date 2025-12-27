"use client";

import { useEffect } from "react";

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function ToastNotification({ message, isVisible, onClose }: ToastNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-[2000] bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-full scale-95 opacity-0'}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {message}
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          ✕
        </button>
      </div>
    </div>
  );
}
import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="flex flex-col items-center">
        {/* Spinning Circle */}
        <div className="w-16 h-16 border-4 border-t-red-600 border-b-red-600 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        {/* Loading Text */}
        <p className="mt-4 text-white font-semibold text-lg animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

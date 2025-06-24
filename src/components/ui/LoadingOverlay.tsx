// components/ui/LoadingOverlay.tsx
import React from 'react';

const LoadingOverlay = ({ message = "Loading..." }: { message?: string }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#f24ca0] border-opacity-50"></div>
      <span className="text-[#f24ca0] font-semibold text-lg">{message}</span>
    </div>
  </div>
);

export default LoadingOverlay;

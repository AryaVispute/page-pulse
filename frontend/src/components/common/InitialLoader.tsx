import React from 'react';
import { Activity } from 'lucide-react';

export const InitialLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground transition-opacity duration-500">
      <div className="flex flex-col items-center gap-6">
        {/* Animated 9-Square Loader */}
        <div className="loader initial-loader-grid">
          <div className="square" id="sq1"></div>
          <div className="square" id="sq2"></div>
          <div className="square" id="sq3"></div>
          <div className="square" id="sq4"></div>
          <div className="square" id="sq5"></div>
          <div className="square" id="sq6"></div>
          <div className="square" id="sq7"></div>
          <div className="square" id="sq8"></div>
          <div className="square" id="sq9"></div>
        </div>

        {/* Brand Text */}
        <div className="flex items-center gap-2 pt-6">
          <Activity className="w-5 h-5 text-white animate-pulse" />
          <span className="text-xl font-bold tracking-tight text-white">Page Pulse</span>
        </div>
        <p className="text-xs text-zinc-500 font-medium tracking-wider uppercase">
          Initializing Engine...
        </p>
      </div>
    </div>
  );
};

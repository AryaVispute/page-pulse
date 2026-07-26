import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950/80 py-8 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-300">Page Pulse</span>
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>

        {/* Mandatory Assessment Footer Link */}
        <div className="flex items-center gap-1.5 font-medium text-zinc-400">
          <span>Built for</span>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline underline-offset-4 transition-colors font-semibold"
          >
            Digital Heroes Training Task
          </a>
        </div>
      </div>
    </footer>
  );
};

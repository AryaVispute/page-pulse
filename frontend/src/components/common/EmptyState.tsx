import React from 'react';
import { Search, Globe, ShieldCheck, Zap } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="w-full rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-12 text-center backdrop-blur-sm">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-6 shadow-inner">
        <Search className="w-8 h-8 text-zinc-300" />
      </div>
      <h3 className="text-xl font-semibold text-white tracking-tight mb-2">No Active Audit Report</h3>
      <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
        Enter any public web application URL above to perform instant SEO analysis, image accessibility checks, and performance latency audits.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2 border-t border-zinc-900 text-left">
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
          <Globe className="w-5 h-5 text-zinc-400 mb-2" />
          <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">SEO & Headings</h4>
          <p className="text-xs text-zinc-500 mt-1">Parses title tags, meta descriptions, and H1 elements.</p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
          <ShieldCheck className="w-5 h-5 text-zinc-400 mb-2" />
          <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">Accessibility</h4>
          <p className="text-xs text-zinc-500 mt-1">Scans images missing vital alt tags across the page.</p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
          <Zap className="w-5 h-5 text-zinc-400 mb-2" />
          <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">Performance</h4>
          <p className="text-xs text-zinc-500 mt-1">Measures exact network response times in milliseconds.</p>
        </div>
      </div>
    </div>
  );
};

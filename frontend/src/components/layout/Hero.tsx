import React from 'react';
import { AuditForm } from '../audit/AuditForm';
import { Zap } from 'lucide-react';

interface HeroProps {
  onAudit: (url: string) => void;
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onAudit, isLoading }) => {
  return (
    <div className="relative py-12 md:py-16 text-center space-y-6 max-w-4xl mx-auto">
      {/* Badge Pill */}
      <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 text-xs text-zinc-300 shadow-xl">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-medium text-zinc-300">Live Website Health & SEO Auditor</span>
        <Zap className="w-3.5 h-3.5 text-amber-400" />
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
        Web Application Audit Engine for Modern Teams
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
        Audit any public website URL in seconds. Analyze latency, HTTP status, meta descriptions, image accessibility, and HTML tag hierarchy instantly.
      </p>

      {/* Audit Input Form */}
      <div className="pt-4 max-w-2xl mx-auto">
        <AuditForm onAudit={onAudit} isLoading={isLoading} />
      </div>
    </div>
  );
};

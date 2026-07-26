import React from 'react';
import { AuditResult } from '../../types/audit.types';
import { MetricCard } from './MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import {
  Zap,
  Heading,
  Image as ImageIcon,
  FileText,
  Clock,
  ShieldCheck,
  ExternalLink,
  Globe,
} from 'lucide-react';

interface AuditResultsProps {
  result: AuditResult;
  url: string;
}

export const AuditResults: React.FC<AuditResultsProps> = ({ result, url }) => {
  const getResponseTimeStatus = (ms: number) => {
    if (ms < 500) return 'good';
    if (ms < 1500) return 'warning';
    return 'bad';
  };

  const getH1Status = (count: number) => {
    if (count === 1) return 'good';
    if (count === 0) return 'warning';
    return 'bad';
  };

  const getAltStatus = (missing: number) => {
    if (missing === 0) return 'good';
    if (missing <= 3) return 'warning';
    return 'bad';
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overview Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Audited Endpoint
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2 break-all">
              {url}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge statusCode={result.status} />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{result.responseTime} ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Page Title */}
        <MetricCard
          title="Page Title"
          value={result.title || 'Missing <title> tag'}
          subtitle={
            result.title
              ? `${result.title.length} characters`
              : 'Add a descriptive <title> tag to improve SEO ranking.'
          }
          icon={FileText}
          status={result.title ? 'good' : 'bad'}
        />

        {/* Response Time */}
        <MetricCard
          title="Response Time"
          value={`${result.responseTime} ms`}
          subtitle={
            result.responseTime < 500
              ? 'Fast server response time'
              : 'Higher latency detected'
          }
          icon={Zap}
          status={getResponseTimeStatus(result.responseTime)}
        />

        {/* H1 Count */}
        <MetricCard
          title="H1 Tag Count"
          value={result.h1Count}
          subtitle={
            result.h1Count === 1
              ? 'Optimal single H1 tag structure'
              : result.h1Count === 0
                ? 'No H1 tags found on page'
                : 'Multiple H1 tags detected'
          }
          icon={Heading}
          status={getH1Status(result.h1Count)}
        />

        {/* Missing ALT Attributes */}
        <MetricCard
          title="Images Missing ALT"
          value={result.imagesWithoutAlt}
          subtitle={
            result.imagesWithoutAlt === 0
              ? 'All image elements have descriptive ALT tags'
              : `${result.imagesWithoutAlt} image(s) missing alt attribute`
          }
          icon={ImageIcon}
          status={getAltStatus(result.imagesWithoutAlt)}
        />

        {/* Word Count */}
        <MetricCard
          title="Approximate Word Count"
          value={result.wordCount.toLocaleString()}
          subtitle="Visible textual body content excluding code/styles"
          icon={ShieldCheck}
          status="neutral"
        />

        {/* HTTP Status Code */}
        <MetricCard
          title="HTTP Status Code"
          value={result.status}
          subtitle={result.status === 200 ? 'Target domain returned HTTP 200 OK' : `Server status ${result.status}`}
          icon={Clock}
          status={result.status === 200 ? 'good' : 'warning'}
        />
      </div>

      {/* Meta Description Detailed Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur-md space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Meta Description
        </span>
        {result.metaDescription ? (
          <p className="text-sm text-zinc-200 leading-relaxed font-normal bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/60">
            "{result.metaDescription}"
          </p>
        ) : (
          <p className="text-sm text-amber-400 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
            No <code>&lt;meta name="description"&gt;</code> tag found on this webpage.
          </p>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  status?: 'good' | 'warning' | 'bad' | 'neutral';
  highlight?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  status = 'neutral',
  highlight = false,
}) => {
  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-300 group hover:-translate-y-1',
        highlight && 'border-zinc-700/80 bg-zinc-900/80 shadow-2xl ring-1 ring-zinc-700/50',
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            {title}
          </span>
          <div
            className={cn(
              'p-2.5 rounded-xl border transition-colors duration-200',
              status === 'good' && 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
              status === 'warning' && 'bg-amber-500/10 border-amber-500/20 text-amber-400',
              status === 'bad' && 'bg-rose-500/10 border-rose-500/20 text-rose-400',
              status === 'neutral' && 'bg-zinc-900 border-zinc-800 text-zinc-300 group-hover:border-zinc-700',
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold text-white tracking-tight break-all leading-tight">
            {value}
          </div>
          {subtitle && <p className="text-xs text-zinc-400 line-clamp-2">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

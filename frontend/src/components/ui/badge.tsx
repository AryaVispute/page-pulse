import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2',
        {
          'border-transparent bg-white text-zinc-950 font-bold': variant === 'default',
          'border-transparent bg-zinc-800 text-zinc-300': variant === 'secondary',
          'border-zinc-700 text-zinc-300': variant === 'outline',
          'border-emerald-500/30 bg-emerald-500/10 text-emerald-400': variant === 'success',
          'border-amber-500/30 bg-amber-500/10 text-amber-400': variant === 'warning',
          'border-rose-500/30 bg-rose-500/10 text-rose-400': variant === 'destructive',
        },
        className,
      )}
      {...props}
    />
  );
}

export { Badge };

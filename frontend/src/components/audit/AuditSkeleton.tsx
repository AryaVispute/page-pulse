import React from 'react';
import { Card, CardContent } from '../ui/card';

export const AuditSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Banner Skeleton */}
      <div className="w-full h-24 rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-48 bg-zinc-800 rounded-md"></div>
          <div className="h-6 w-32 bg-zinc-800 rounded-md"></div>
        </div>
        <div className="h-10 w-28 bg-zinc-800 rounded-lg"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="border-zinc-800 bg-zinc-950/40">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-3 w-24 bg-zinc-800 rounded"></div>
                <div className="h-9 w-9 bg-zinc-800 rounded-xl"></div>
              </div>
              <div className="space-y-2">
                <div className="h-7 w-3/4 bg-zinc-800 rounded"></div>
                <div className="h-3 w-1/2 bg-zinc-800/60 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

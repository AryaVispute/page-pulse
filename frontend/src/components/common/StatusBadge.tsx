import React from 'react';
import { Badge } from '../ui/badge';
import { CheckCircle2, AlertTriangle, XCircle, Activity } from 'lucide-react';

interface StatusBadgeProps {
  statusCode: number;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ statusCode }) => {
  if (statusCode >= 200 && statusCode < 300) {
    return (
      <Badge variant="success" className="gap-1.5 px-3 py-1 text-sm font-medium">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>HTTP {statusCode} OK</span>
      </Badge>
    );
  }

  if (statusCode >= 300 && statusCode < 400) {
    return (
      <Badge variant="warning" className="gap-1.5 px-3 py-1 text-sm font-medium">
        <AlertTriangle className="w-4 h-4 text-amber-400" />
        <span>HTTP {statusCode} Redirect</span>
      </Badge>
    );
  }

  if (statusCode >= 400) {
    return (
      <Badge variant="destructive" className="gap-1.5 px-3 py-1 text-sm font-medium">
        <XCircle className="w-4 h-4 text-rose-400" />
        <span>HTTP {statusCode} Error</span>
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm font-medium">
      <Activity className="w-4 h-4 text-zinc-400" />
      <span>HTTP {statusCode}</span>
    </Badge>
  );
};

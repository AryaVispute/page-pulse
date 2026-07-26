import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-200 backdrop-blur-md shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="font-semibold text-rose-100 text-base">Audit Failed</h4>
          <p className="text-sm text-rose-300/90 leading-relaxed">{message}</p>
          {onRetry && (
            <div className="pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="border-rose-500/40 text-rose-200 hover:bg-rose-500/20 hover:text-white gap-2 text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

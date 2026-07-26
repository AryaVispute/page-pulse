import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Globe, ArrowRight, Loader2, Clipboard } from 'lucide-react';

interface AuditFormProps {
  onAudit: (url: string) => void;
  isLoading: boolean;
}

export const AuditForm: React.FC<AuditFormProps> = ({ onAudit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setInputError('Please enter a URL to audit.');
      return;
    }

    setInputError('');
    onAudit(trimmedUrl);
  };

  const handlePasteSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
    setInputError('');
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="relative w-full group">
        <div className="relative flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl shadow-2xl transition-all duration-300 focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-zinc-700/50">
          <div className="relative flex-1 w-full flex items-center">
            <div className="absolute left-4 text-zinc-500 pointer-events-none">
              <Globe className="w-5 h-5 text-zinc-400" />
            </div>
            <Input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (inputError) setInputError('');
              }}
              disabled={isLoading}
              className="pl-12 pr-4 border-0 bg-transparent focus:ring-0 focus:border-0 h-14 text-base text-white placeholder:text-zinc-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full sm:w-auto h-12 px-8 font-semibold rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 transition-all duration-200 gap-2 shrink-0 shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-zinc-950" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <span>Analyze Page</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </form>

      {inputError && (
        <p className="text-xs text-rose-400 pl-4 animate-in fade-in">{inputError}</p>
      )}

      {/* Quick sample URL helper */}
      <div className="flex flex-wrap items-center gap-2 pl-2 text-xs text-zinc-400">
        <span className="flex items-center gap-1">
          <Clipboard className="w-3.5 h-3.5 text-zinc-400" /> Quick test:
        </span>
        <button
          type="button"
          onClick={() => handlePasteSample('https://example.com')}
          className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-200"
        >
          https://example.com
        </button>
        <button
          type="button"
          onClick={() => handlePasteSample('https://digitalheroesco.com')}
          className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-200"
        >
          digitalheroesco.com
        </button>
        <button
          type="button"
          onClick={() => handlePasteSample('https://github.com')}
          className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-200"
        >
          github.com
        </button>
      </div>
    </div>
  );
};

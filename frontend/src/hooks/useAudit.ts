import { useState, useCallback } from 'react';
import { AuditResult, AuditStatus } from '../types/audit.types';
import { ApiService } from '../services/api.service';

export function useAudit() {
  const [status, setStatus] = useState<AuditStatus>('idle');
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [auditedUrl, setAuditedUrl] = useState<string>('');

  const runAudit = useCallback(async (url: string) => {
    setStatus('loading');
    setError(null);
    setAuditedUrl(url);

    try {
      const data = await ApiService.analyzeUrl(url);
      setResult(data);
      setStatus('success');
    } catch (err: any) {
      setError(err.message || 'An error occurred during the audit');
      setStatus('error');
      setResult(null);
    }
  }, []);

  const resetAudit = useCallback(() => {
    setStatus('idle');
    setResult(null);
    setError(null);
    setAuditedUrl('');
  }, []);

  return {
    status,
    result,
    error,
    auditedUrl,
    runAudit,
    resetAudit,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    isIdle: status === 'idle',
  };
}

import React from 'react';
import { useAudit } from '../hooks/useAudit';
import { Hero } from '../components/layout/Hero';
import { Container } from '../components/layout/Container';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { AuditSkeleton } from '../components/audit/AuditSkeleton';
import { AuditResults } from '../components/audit/AuditResults';

export const DashboardPage: React.FC = () => {
  const { result, error, auditedUrl, runAudit, isLoading, isError, isSuccess, isIdle } =
    useAudit();

  return (
    <div className="space-y-12 pb-16">
      <Hero onAudit={runAudit} isLoading={isLoading} />

      <Container className="max-w-5xl">
        {/* State 1: Idle (Empty State) */}
        {isIdle && <EmptyState />}

        {/* State 2: Loading (Skeleton Animation) */}
        {isLoading && <AuditSkeleton />}

        {/* State 3: Error Alert */}
        {isError && error && (
          <ErrorAlert
            message={error}
            onRetry={() => {
              if (auditedUrl) runAudit(auditedUrl);
            }}
          />
        )}

        {/* State 4: Success (Audit Dashboard Results) */}
        {isSuccess && result && <AuditResults result={result} url={auditedUrl} />}
      </Container>
    </div>
  );
};

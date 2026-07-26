export interface AuditResult {
  status: number;
  responseTime: number;
  title: string;
  metaDescription: string;
  h1Count: number;
  imagesWithoutAlt: number;
  wordCount: number;
}

export interface ApiError {
  error: string;
  code?: string;
}

export type AuditStatus = 'idle' | 'loading' | 'success' | 'error';

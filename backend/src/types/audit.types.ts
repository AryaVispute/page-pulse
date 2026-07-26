export interface AuditRequest {
  url: string;
}

export interface AuditResult {
  status: number;
  responseTime: number;
  title: string;
  metaDescription: string;
  h1Count: number;
  imagesWithoutAlt: number;
  wordCount: number;
}

export interface ApiErrorResponse {
  error: string;
  code?: string;
  statusCode?: number;
}

import { AuditResult, ApiError } from '../types/audit.types';

export class ApiService {
  /**
   * Executes audit request against backend API endpoint POST /api/audit
   */
  public static async analyzeUrl(url: string): Promise<AuditResult> {
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as any;
        const errorMessage = errorData.message || errorData.error || 'Failed to perform website audit.';
        throw new Error(errorMessage);
      }

      return data as AuditResult;
    } catch (err: any) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('An unexpected network error occurred while reaching the audit server.');
    }
  }
}

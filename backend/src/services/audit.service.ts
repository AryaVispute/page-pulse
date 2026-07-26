import axios, { AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import { config } from '../config';
import { AuditResult } from '../types/audit.types';
import { AppError } from '../utils/customError.util';
import { calculateWordCount } from '../utils/wordCounter.util';

export class AuditService {
  /**
   * Executes audit on the given target URL.
   */
  public static async performAudit(targetUrl: string): Promise<AuditResult> {
    const startTime = Date.now();

    try {
      const response = await axios.get(targetUrl, {
        timeout: config.requestTimeout,
        headers: {
          'User-Agent': config.userAgent,
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        maxRedirects: 5,
        validateStatus: () => true, // Capture all HTTP status codes without throwing standard axios error
      });

      const responseTime = Date.now() - startTime;
      const statusCode = response.status;

      // Validate Content-Type: Only allow HTML content
      const rawContentType =
        typeof response.headers.get === 'function'
          ? response.headers.get('content-type')
          : (response.headers as any)['content-type'] || (response.headers as any)['Content-Type'];

      const contentType = (rawContentType || '').toString().toLowerCase();
      const isHtml = contentType.includes('text/html') || contentType.includes('application/xhtml+xml');

      if (!isHtml) {
        throw new AppError(
          'Only HTML webpages are supported.',
          422,
          'NON_HTML_RESPONSE',
        );
      }

      const html = typeof response.data === 'string' ? response.data : String(response.data || '');
      const $ = cheerio.load(html);

      // Extract Title
      const title = $('title').first().text().trim() || '';

      // Extract Meta Description (check name="description" and og:description fallback)
      let metaDescription = $('meta[name="description" i]').attr('content')?.trim() || '';
      if (!metaDescription) {
        metaDescription = $('meta[property="og:description" i]').attr('content')?.trim() || '';
      }

      // Count H1 tags
      const h1Count = $('h1').length;

      // Count images without Alt text or with empty/whitespace-only alt
      let imagesWithoutAlt = 0;
      $('img').each((_, elem) => {
        const alt = $(elem).attr('alt');
        if (alt === undefined || alt === null || alt.trim() === '') {
          imagesWithoutAlt++;
        }
      });

      // Calculate Word Count
      const wordCount = calculateWordCount($);

      return {
        status: statusCode,
        responseTime,
        title,
        metaDescription,
        h1Count,
        imagesWithoutAlt,
        wordCount,
      };
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.code === 'ECONNABORTED' || axiosError.message.includes('timeout')) {
          throw new AppError(
            `Connection timeout. Target site failed to respond within ${config.requestTimeout / 1000} seconds.`,
            504,
            'GATEWAY_TIMEOUT',
          );
        }

        if (axiosError.code === 'ENOTFOUND' || axiosError.code === 'EAI_AGAIN') {
          throw new AppError(
            'DNS lookup failed. Target domain could not be resolved. Please verify the URL.',
            400,
            'DNS_LOOKUP_FAILED',
          );
        }

        if (axiosError.code === 'ECONNREFUSED') {
          throw new AppError(
            'Connection refused. Target server rejected the connection.',
            502,
            'CONNECTION_REFUSED',
          );
        }

        if (axiosError.code === 'ERR_TLS_CERT_ALTNAME_INVALID' || axiosError.code === 'DEPTH_ZERO_SELF_SIGNED_CERT') {
          throw new AppError(
            'SSL/TLS Certificate verification failed for target site.',
            502,
            'SSL_ERROR',
          );
        }
      }

      throw new AppError(
        `Failed to fetch target website: ${error.message || 'Unknown network error'}`,
        500,
        'FETCH_FAILED',
      );
    }
  }
}

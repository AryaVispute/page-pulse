import * as cheerio from 'cheerio';

/**
 * Calculates approximate word count of visible body text,
 * filtering out non-content elements like scripts, styles, and SVG text.
 */
export function calculateWordCount($: cheerio.CheerioAPI): number {
  // Clone body to avoid mutating original DOM
  const bodyClone = $('body').clone();

  // Remove non-user-visible content blocks
  bodyClone
    .find('script, style, noscript, svg, nav, footer, header, code, iframe, style')
    .remove();

  // Extract clean text content
  const text = bodyClone.text().replace(/\s+/g, ' ').trim();

  if (!text) {
    return 0;
  }

  // Split by whitespace and count valid words
  const words = text.split(/\s+/).filter((word) => word.trim().length > 0);
  return words.length;
}

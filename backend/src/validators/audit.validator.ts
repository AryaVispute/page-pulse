import { z } from 'zod';

export const auditSchema = z.object({
  url: z
    .string({ required_error: 'URL is required' })
    .trim()
    .min(1, 'URL cannot be empty')
    .refine(
      (val) => {
        try {
          let targetUrl = val;
          if (!/^https?:\/\//i.test(targetUrl)) {
            targetUrl = `https://${targetUrl}`;
          }
          const parsed = new URL(targetUrl);
          return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        } catch {
          return false;
        }
      },
      { message: 'Invalid URL format. Please provide a valid http or https URL.' },
    )
    .transform((val) => {
      if (!/^https?:\/\//i.test(val)) {
        return `https://${val}`;
      }
      return val;
    }),
});

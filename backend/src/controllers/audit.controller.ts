import { Request, Response, NextFunction } from 'express';
import { AuditService } from '../services/audit.service';
import { auditSchema } from '../validators/audit.validator';
import { AppError } from '../utils/customError.util';

export class AuditController {
  /**
   * Controller handler for POST /api/audit
   */
  public static async analyze(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validationResult = auditSchema.safeParse(req.body);

      if (!validationResult.success) {
        const firstIssue = validationResult.error.errors[0]?.message || 'Invalid input data';
        throw new AppError(firstIssue, 400, 'INVALID_URL');
      }

      const targetUrl = validationResult.data.url;
      const result = await AuditService.performAudit(targetUrl);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

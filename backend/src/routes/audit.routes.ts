import { Router } from 'express';
import { AuditController } from '../controllers/audit.controller';

const router = Router();

// POST /api/audit
router.post('/audit', AuditController.analyze);

export default router;

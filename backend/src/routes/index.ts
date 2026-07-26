import { Router } from 'express';
import auditRoutes from './audit.routes';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'Page Pulse API', timestamp: new Date().toISOString() });
});

// API Routes
router.use('/', auditRoutes);

export default router;

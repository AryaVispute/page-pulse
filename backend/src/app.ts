import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Express = express();

// Middlewares
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  }),
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({ message: "Backend is working" });
});

app.get("/api/test", (_req, res) => {
  res.json({ message: "API is working" });
});
// API Base Route
app.use('/api', routes);

// 404 Route Handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found', code: 'NOT_FOUND' });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;

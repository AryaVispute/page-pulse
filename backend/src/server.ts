import app from './app';
import { config } from './config';

const server = app.listen(config.port, () => {
  console.log(`⚡ Page Pulse Backend Engine running in [${config.nodeEnv}] on port ${config.port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

export default server;

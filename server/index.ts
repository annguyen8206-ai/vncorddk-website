import express from 'express';
import cors from 'cors';
import { getDb } from './db.js';

// Routes
import authRouter from './routes/auth.js';
import settingsRouter from './routes/settings.js';
import leadsRouter from './routes/leads.js';
import articlesRouter from './routes/articles.js';
import packagesRouter from './routes/packages.js';
import hospitalsRouter from './routes/hospitals.js';
import reviewsRouter from './routes/reviews.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
const allowedOrigins = process.env.APP_ORIGINS
  ? process.env.APP_ORIGINS.split(',').map(o => o.trim())
  : [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://vncorddk.com',
      'https://www.vncorddk.com',
    ];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize database on startup
getDb();
console.log('[Server] Database initialized');

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'VNCORD-DK API' });
});

// Mount routes
app.use('/api/auth', authRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/packages', packagesRouter);
app.use('/api/hospitals', hospitalsRouter);
app.use('/api/reviews', reviewsRouter);

// 404 handler for unknown API routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({ error: 'API endpoint không tồn tại.' });
});

app.listen(PORT, () => {
  console.log(`[Server] VNCORD-DK API running at http://localhost:${PORT}`);
  console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
});

export default app;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import ratingRoutes from './routes/rating.routes';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Create videos directory if it doesn't exist
const videosDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
  console.log(`✓ Created videos directory at: ${videosDir}`);
} else {
  console.log(`✓ Videos directory exists at: ${videosDir}`);
  // List videos in directory
  const videos = fs.readdirSync(videosDir);
  console.log(`✓ Videos found: ${videos.length}`, videos);
}

// CORS configuration - importante para VPS
app.use(cors({
  origin: '*', // En producción, especifica los dominios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
  exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  if (req.headers.range) {
    console.log(`  ↳ Range: ${req.headers.range}`);
  }
  next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Math Learning API is running',
    timestamp: new Date().toISOString(),
    videosDir: videosDir,
    videosCount: fs.readdirSync(videosDir).length
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ratings', ratingRoutes);
import adminRoutes from './routes/admin.routes';
app.use('/api/admin', adminRoutes);

// Video streaming endpoint with improved error handling
app.get('/api/videos/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(videosDir, filename);

  console.log(`📹 Video request: ${filename}`);
  console.log(`   Path: ${filePath}`);

  // Security: prevent path traversal
  if (filename.includes('..') || filename.includes('/')) {
    console.log(`❌ Invalid filename: ${filename}`);
    return res.status(400).json({ error: 'Invalid filename' });
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Video not found: ${filePath}`);
    return res.status(404).json({
      error: 'Video not found',
      filename: filename,
      path: filePath
    });
  }

  try {
    // Get file stats
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    console.log(`   File size: ${fileSize} bytes`);
    console.log(`   Range requested: ${range || 'none (full file)'}`);

    if (range) {
      // Handle range requests for video streaming
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      // Validate range
      if (start >= fileSize || end >= fileSize) {
        console.log(`❌ Invalid range: ${start}-${end} for file size ${fileSize}`);
        return res.status(416).json({
          error: 'Requested range not satisfiable',
          fileSize: fileSize
        });
      }

      const chunkSize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
        'Cache-Control': 'no-cache',
      };

      console.log(`   ✓ Sending range: ${start}-${end}/${fileSize} (${chunkSize} bytes)`);

      res.writeHead(206, head);

      file.on('error', (error) => {
        console.error(`❌ Error reading file stream:`, error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Error streaming video' });
        }
      });

      file.pipe(res);

    } else {
      // If no range requested, send the whole file
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache',
      };

      console.log(`   ✓ Sending full file (${fileSize} bytes)`);

      res.writeHead(200, head);

      const stream = fs.createReadStream(filePath);

      stream.on('error', (error) => {
        console.error(`❌ Error reading file stream:`, error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Error streaming video' });
        }
      });

      stream.pipe(res);
    }

  } catch (error) {
    console.error(`❌ Error processing video request:`, error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

import { createServer } from 'http';
import { initSocket } from './socket';

const server = createServer(app);
const io = initSocket(server);

server.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 Math Learning Backend Server`);
  console.log(`${'='.repeat(50)}`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`📁 Videos directory: ${videosDir}`);
  console.log(`📹 Videos available: ${fs.readdirSync(videosDir).length}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`${'='.repeat(50)}\n`);
});
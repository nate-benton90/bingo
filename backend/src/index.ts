import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: ['https://localhost', 'http://localhost'], // Allow both HTTP and HTTPS
  credentials: true, // Allow credentials (if needed)
}));

app.options('*', cors({
  origin: ['https://localhost', 'http://localhost'],
  credentials: true,
}));

app.use(express.json()); // Parse JSON payloads

// Routes
app.use('/api/users', userRoutes);

const httpsOptions = {
  key: fs.readFileSync('certs/localhost.key'),
  cert: fs.readFileSync('certs/localhost.crt'),
};

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Backend running on port ${port}`);
});

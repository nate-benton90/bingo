import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: 'https://localhost', // Ensure this matches your frontend's domain
  credentials: true
}));

app.use(express.json()); // This line is essential for parsing JSON

// Routes
app.use('/api/users', userRoutes); // Ensure this matches the URL used in the frontend

const httpsOptions = {
  key: fs.readFileSync('certs/localhost.key'),
  cert: fs.readFileSync('certs/localhost.crt')
};

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
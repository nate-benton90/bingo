import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3001;

// Middleware
app.use(cors({
    origin: 'https://localhost', // Adjust to match your frontend
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes); // Ensure this matches the Nginx config

// Start the server
app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});

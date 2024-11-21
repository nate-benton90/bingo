import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: 'https://localhost:3001', credentials: true }));
app.use(express.json()); // Required for JSON request bodies

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`backend running on port ${port}`);
});

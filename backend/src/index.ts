import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes';

// 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});

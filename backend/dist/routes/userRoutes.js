import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Error logging in user' });
  }
});

export default router;

import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/register', async (req, res) => {
  console.log('Request received at /register with body:', req.body);  // Log request body

  try {
    await registerUser(req, res);
  } catch (err) {
    console.error('Error in register route:', err);  // Log the error for debugging
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  console.log('Request received at /login with body:', req.body);  // Log request body

  try {
    await loginUser(req, res);
  } catch (err) {
    console.error('Error in login route:', err);  // Log the error for debugging
    res.status(500).send('Error logging in user');
  }
});

export default router;

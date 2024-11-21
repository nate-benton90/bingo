import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/register', async (req, res) => {
  console.log('Incoming request:', req.body);
  try {
    const result = await registerUser(req, res);
    console.log('Registration successful:', result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
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

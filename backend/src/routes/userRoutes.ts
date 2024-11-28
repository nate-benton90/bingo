import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
    console.log('Register endpoint hit with body:', req.body);  // Log for debugging
    try {
        await registerUser(req, res);
    } catch (err) {
        console.error('Error in register route:', err);
        res.status(500).send('Error registering user');
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    console.log('Login endpoint hit with body:', req.body);  // Log for debugging
    try {
        await loginUser(req, res);
    } catch (err) {
        console.error('Error in login route:', err);
        res.status(500).send('Error logging in user');
    }
});

export default router;

import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/register', (req, res) => {
  registerUser(req, res).catch(err => res.status(500).send('Error'));
});

router.post('/login', (req, res) => {
  loginUser(req, res).catch(err => res.status(500).send('Error'));
});

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    console.log('Request received at /register with body:', req.body); // Log request body
    try {
        await (0, userController_1.registerUser)(req, res);
    }
    catch (err) {
        console.error('Error in register route:', err); // Log the error for debugging
        res.status(500).send('Error registering user');
    }
});
router.post('/login', async (req, res) => {
    console.log('Request received at /login with body:', req.body); // Log request body
    try {
        await (0, userController_1.loginUser)(req, res);
    }
    catch (err) {
        console.error('Error in login route:', err); // Log the error for debugging
        res.status(500).send('Error logging in user');
    }
});
exports.default = router;

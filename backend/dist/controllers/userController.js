"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
// 
const findUserByUsername = async (username) => {
    try {
        const result = await db_1.default.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            return result.rows[0]; // Return the user object
        }
        return null; // Return null if no user found
    }
    catch (error) {
        console.error('Error finding user:', error);
        throw error; // Throw the error so it can be caught in loginUser
    }
};
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        await db_1.default.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).send('User registered');
    }
    catch (error) {
        res.status(400).send('Error registering user');
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (!user) {
            console.log('User not found'); // Add this line for debugging
            return res.status(400).send('Invalid credentials');
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            console.log('Invalid password'); // Add this line for debugging
            return res.status(400).send('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'your_jwt_secret');
        console.log('Login successful, token generated'); // Add this line for debugging
        res.json({ token });
    }
    catch (error) {
        console.error('Login error:', error); // Add this line for debugging
        res.status(500).send('Error logging in');
    }
};
exports.loginUser = loginUser;

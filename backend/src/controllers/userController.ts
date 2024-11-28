import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import pool from "../db";

//

const findUserByUsername = async (username: string) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the user object
    }
    return null; // Return null if no user found
  } catch (error) {
    console.error("Error finding user:", error);
    throw error; // Throw the error so it can be caught in loginUser
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).send("Invalid input");
  }

  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);
    res.status(201).send("user registered");
  } catch (error) {
    res.status(400).send("error registering user");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      console.log("User not found"); // Add this line for debugging
      return res.status(400).send("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("Invalid password"); // Add this line for debugging
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, "your_jwt_secret");
    console.log("Login successful, token generated"); // Add this line for debugging
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error); // Add this line for debugging
    res.status(500).send("Error logging in");
  }
};

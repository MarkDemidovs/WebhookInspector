import { Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const { rows } = await pool.query(
            "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
            [email, hashed]
        );
        res.status(201).json({ message: "Signed in" });
    } catch (err) {
        res.status(500).json({ error: "Registration failed " });
    }
}

export const whoami = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    return res.status(200).json({ userId });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = rows[0];

        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "15m" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
            // Optional: force expiration matching JWT session
            maxAge: 15 * 60 * 1000,
        });

        return res.json({ message: "Logged in" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Login failed" });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });
        res.json({ message: "Logged out" });
    } catch (err) {
        res.status(500).json({ error: "Logout failed" });
    }
};
import { Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const { rows } = await pool.query(
            "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
            [email, hashed]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.log(err);
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = rows[0];

        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "15m" });

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });
        res.json({ message: "Logged in", userId: user.id });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });
        res.json({ message: "Logged out" });
    } catch (err) {
        res.status(500).json({ error: "Logout failed" });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users");
        res.json(rows);
    } catch {
        res.status(500).json({ error: "Failed to fetch users" })
    }
}
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
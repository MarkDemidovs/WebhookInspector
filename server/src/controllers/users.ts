import { Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const register = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users");
        res.status(201).json(rows[0]);
    } catch (err) {
        console.log(err);
    }
}
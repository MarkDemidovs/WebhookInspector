import { Request, Response } from "express";
import { pool } from "../db";
import { nanoid } from 'nanoid';

export const getEndpoints = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    try {
        const { rows } = await pool.query("SELECT * FROM endpoints WHERE user_id = $1", [userId]);

        return res.status(200).json({ data: rows })

    } catch (err) {
        return res.status(500).json({ error: "Couldn't get endpoint." });
    }
}

export const createEndpoint = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const slug = nanoid();
    const { label } = req.body;

    try {
        if (!label) {
            return res.status(400).json({ error: "Label hasn't been given." });
        }
        const { rows } = await pool.query("INSERT INTO endpoints (user_id, slug, label) VALUES ($1, $2, $3) RETURNING *", [userId, slug, label]);


        return res.status(201).json({ data: rows });
    } catch (err) {
        return res.status(500).json({ error: "Couldn't create endpoint." });
    }
};

export const deleteEndpoint = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as any).userId;

    try {
        const { rows } = await pool.query("DELETE FROM endpoints WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);
        res.status(200).json({ data: rows });
    } catch (err) {
        return res.status(500).json({ error: "Couldn't delete endpoint." });
    }
}
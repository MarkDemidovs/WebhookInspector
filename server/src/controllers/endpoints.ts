import { Request, Response } from "express";
import { pool } from "../db";

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

};
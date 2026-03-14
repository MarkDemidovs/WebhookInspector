import { Request, Response } from "express";
import { pool } from "../db";
import { nanoid } from "nanoid";

export const shareRequests = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const share_token = nanoid();
        const { rows } = await pool.query("UPDATE requests SET share_token = $1 WHERE id = $2 RETURNING *", [share_token, id]);

        res.status(200).json({ data: rows });
    } catch (err) {
        return res.status(500).json({ error: "Couldn't update requests. "});
    }
}

export const getSharedRequests = async (req: Request, res: Response ) => {
    const { token } = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM requests WHERE share_token = $1", [token]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Nothing found. "});
        }

        res.status(200).json({ data: rows });
    } catch (err) {
        return res.status(500).json({ error: "Couldn't get shared requests." })
    }
}
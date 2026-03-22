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

export const getEndpoint = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as any).userId;

    try {
        const { rows } = await pool.query("SELECT * FROM endpoints WHERE id = $1 AND user_id = $2", [id, userId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Endpoint not found." });
        }

        return res.status(200).json({ data: rows[0] });
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


export const getRequests = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as any).userId;

    try {
        const ownerCheck = await pool.query("SELECT 1 FROM endpoints WHERE id = $1 AND user_id = $2", [id, userId]);
        if (ownerCheck.rowCount === 0) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const { rows } = await pool.query("SELECT * FROM requests WHERE endpoint_id = $1", [id]);
        res.status(200).json({ data: rows });

    } catch (err) {
        return res.status(500).json({ error: "Couldn't get requests." });
    }
}

export const deleteRequests = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as any).userId;
    
    try {
        const ownerCheck = await pool.query("SELECT 1 FROM endpoints WHERE id = $1 AND user_id = $2", [id, userId]);
        if (ownerCheck.rowCount === 0) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const { rows } = await pool.query("DELETE FROM requests WHERE endpoint_id = $1 RETURNING *", [id]);
        res.status(200).json({ data: rows });
    } catch (err) {
        return res.status(500).json({ error: "Couldn't delete request."});
    }
}

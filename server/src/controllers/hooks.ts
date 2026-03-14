import { Request, Response } from "express";
import { pool } from "../db";

export const captureRequest = async (req: Request, res: Response) => {
    const { slug } = req.params;

    const { rows } = await pool.query("SELECT id FROM endpoints WHERE slug = $1", [slug]);
    if (rows.length === 0) {
        return res.status(404).json({ error: "Slug doesn't exist." });
    }

    await pool.query("INSERT INTO requests (endpoint_id, method, headers, body, ip) VALUES ($1, $2, $3, $4, $5)", [rows[0].id, req.method, req.headers, req.body, req.ip]);
    res.status(200).json({ ok: true });
};
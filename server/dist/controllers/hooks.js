"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureRequest = void 0;
const db_1 = require("../db");
const captureRequest = async (req, res) => {
    const { slug } = req.params;
    const { rows } = await db_1.pool.query("SELECT id FROM endpoints WHERE slug = $1", [slug]);
    if (rows.length === 0) {
        return res.status(404).json({ error: "Slug doesn't exist." });
    }
    await db_1.pool.query("INSERT INTO requests (endpoint_id, method, headers, body, ip) VALUES ($1, $2, $3, $4, $5)", [rows[0].id, req.method, req.headers, req.body, req.ip]);
    res.status(200).json({ ok: true });
};
exports.captureRequest = captureRequest;

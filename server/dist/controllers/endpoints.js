"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequests = exports.getRequests = exports.deleteEndpoint = exports.createEndpoint = exports.getEndpoint = exports.getEndpoints = void 0;
const db_1 = require("../db");
const nanoid_1 = require("nanoid");
const getEndpoints = async (req, res) => {
    const userId = req.userId;
    try {
        const { rows } = await db_1.pool.query("SELECT * FROM endpoints WHERE user_id = $1", [userId]);
        return res.status(200).json({ data: rows });
    }
    catch (err) {
        return res.status(500).json({ error: "Couldn't get endpoint." });
    }
};
exports.getEndpoints = getEndpoints;
const getEndpoint = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const { rows } = await db_1.pool.query("SELECT * FROM endpoints WHERE id = $1 AND user_id = $2", [id, userId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Endpoint not found." });
        }
        return res.status(200).json({ data: rows[0] });
    }
    catch (err) {
        return res.status(500).json({ error: "Couldn't get endpoint." });
    }
};
exports.getEndpoint = getEndpoint;
const createEndpoint = async (req, res) => {
    const userId = req.userId;
    const slug = (0, nanoid_1.nanoid)();
    const { label } = req.body;
    try {
        if (!label) {
            return res.status(400).json({ error: "Label hasn't been given." });
        }
        const { rows } = await db_1.pool.query("INSERT INTO endpoints (user_id, slug, label) VALUES ($1, $2, $3) RETURNING *", [userId, slug, label]);
        return res.status(201).json({ data: rows });
    }
    catch (err) {
        return res.status(500).json({ error: "Couldn't create endpoint." });
    }
};
exports.createEndpoint = createEndpoint;
const deleteEndpoint = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const { rows } = await db_1.pool.query("DELETE FROM endpoints WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);
        res.status(200).json({ data: rows });
    }
    catch (err) {
        return res.status(500).json({ error: "Couldn't delete endpoint." });
    }
};
exports.deleteEndpoint = deleteEndpoint;
const getRequests = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const ownerCheck = await db_1.pool.query("SELECT 1 FROM endpoints WHERE id = $1 AND user_id = $2", [id, userId]);
        if (ownerCheck.rowCount === 0) {
            return res.status(403).json({ error: "Forbidden" });
        }
        const { rows } = await db_1.pool.query("SELECT * FROM requests WHERE endpoint_id = $1", [id]);
        res.status(200).json({ data: rows });
    }
    catch (err) {
        return res.status(500).json({ error: "Couldn't get requests." });
    }
};
exports.getRequests = getRequests;
const deleteRequests = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const ownerCheck = await db_1.pool.query("SELECT 1 FROM endpoints WHERE id = $1 AND user_id = $2", [id, userId]);
        if (ownerCheck.rowCount === 0) {
            return res.status(403).json({ error: "Forbidden" });
        }
        const { rows } = await db_1.pool.query("DELETE FROM requests WHERE endpoint_id = $1 RETURNING *", [id]);
        res.status(200).json({ data: rows });
    }
    catch (err) {
        return res.status(500).json({ error: "Couldn't delete request." });
    }
};
exports.deleteRequests = deleteRequests;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedRequests = exports.shareRequests = void 0;
const db_1 = require("../db");
const nanoid_1 = require("nanoid");
const shareRequests = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        // Check if request belongs to user's endpoint
        const ownerCheck = await db_1.pool.query("SELECT 1 FROM requests r JOIN endpoints e ON r.endpoint_id = e.id WHERE r.id = $1 AND e.user_id = $2", [id, userId]);
        if (ownerCheck.rowCount === 0) {
            return res.status(403).json({ error: "Forbidden" });
        }
        const share_token = (0, nanoid_1.nanoid)();
        const { rows } = await db_1.pool.query("UPDATE requests SET share_token = $1 WHERE id = $2 RETURNING *", [share_token, id]);
        res.status(200).json({ data: rows });
    }
    catch (err) {
        return res.status(500).json({ error: "Couldn't update requests. " });
    }
};
exports.shareRequests = shareRequests;
const getSharedRequests = async (req, res) => {
    const { token } = req.params;
    try {
        const { rows } = await db_1.pool.query("SELECT * FROM requests WHERE share_token = $1", [token]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Nothing found. " });
        }
        res.status(200).json({ data: rows });
    }
    catch (err) {
        return res.status(500).json({ error: "Couldn't get shared requests." });
    }
};
exports.getSharedRequests = getSharedRequests;

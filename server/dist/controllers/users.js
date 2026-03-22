"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.whoami = exports.register = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashed = await bcrypt_1.default.hash(password, 10);
        const { rows } = await db_1.pool.query("INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *", [email, hashed]);
        res.status(201).json({ message: "Signed in" });
    }
    catch (err) {
        res.status(500).json({ error: "Registration failed " });
    }
};
exports.register = register;
const whoami = async (req, res) => {
    const userId = req.userId;
    return res.status(200).json({ userId });
};
exports.whoami = whoami;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { rows } = await db_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = rows[0];
        if (!user)
            return res.status(401).json({ error: "Invalid credentials" });
        const match = await bcrypt_1.default.compare(password, user.password_hash);
        if (!match)
            return res.status(401).json({ error: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
            // Optional: force expiration matching JWT session
            maxAge: 15 * 60 * 1000,
        });
        return res.json({ message: "Logged in" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Login failed" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });
        res.json({ message: "Logged out" });
    }
    catch (err) {
        res.status(500).json({ error: "Logout failed" });
    }
};
exports.logout = logout;

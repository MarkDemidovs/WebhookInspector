"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const hooks_1 = __importDefault(require("./routes/hooks"));
const endpoints_1 = __importDefault(require("./routes/endpoints"));
const requests_1 = __importDefault(require("./routes/requests"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", users_1.default);
app.use("/api/hooks", hooks_1.default);
app.use("/api/endpoints", endpoints_1.default);
app.use("/api/requests", requests_1.default);
exports.default = app;

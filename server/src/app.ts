import express from "express";
import cors from "cors";
import userRouter from "./routes/users";
import cookieParser from "cookie-parser"
import hooksRouter from "./routes/hooks";
import endpointsRouter from "./routes/endpoints";
import requestsRouter from "./routes/requests";


const app = express();

const BASE_URL = process.env.VITE_API_URL || 'http://localhost:4000/api';

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/hooks", hooksRouter);
app.use("/api/endpoints", endpointsRouter);
app.use("/api/requests", requestsRouter);

export default app;
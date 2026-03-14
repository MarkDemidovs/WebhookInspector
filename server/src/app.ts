import express from "express";
import cors from "cors";
import userRouter from "./routes/users";

const app = express();
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json());

app.use("/api/auth", userRouter)
export default app;
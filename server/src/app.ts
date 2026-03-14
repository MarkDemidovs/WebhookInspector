import express from "express";
import cors from "cors";
import userRouter from "./routes/users";
import cookieParser from "cookie-parser"
import hooksRouter from "./routes/hooks";
import endpointsRouter from "./routes/endpoints";
import requestsRouter from "./routes/requests";

const app = express();
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/hooks", hooksRouter);
app.use("/api/endpoints", endpointsRouter);
app.use("/api/requests", requestsRouter);

export default app;
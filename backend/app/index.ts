import express from "express";
import cors from "cors";
import router from "./routes/route";
import connectDB from "./config/db/connectDB";
import ServerlessHttp from "serverless-http";

export const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/v1/todo", router);

export const TodoHandler = ServerlessHttp(app);

